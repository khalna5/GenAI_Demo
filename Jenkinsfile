pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    parameters {
        string(name: 'TEST_TAG', defaultValue: '@risky', description: 'Enter test tag (e.g., @risky, @regression)')
    }

    environment {
        MODIFIED_TESTS = ''
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install chromium'
            }
        }

    stage('Detect Modified Test Files') {
    steps {
        script {
            sh 'git fetch origin main'

            // DO NOT use `def` if you want to pass values across stages
            def rawFiles = sh(
                script: "git diff --name-only origin/main...HEAD",
                returnStdout: true
            ).trim()

            echo "Raw changed files: ${rawFiles}"

            def testFiles = rawFiles.split("\n").findAll {
                it.endsWith('.spec.js') || it.toLowerCase().contains('test')
            }

            if (testFiles && testFiles.size() > 0) {
                env.MODIFIED_TESTS = testFiles.join(',')
                echo "Modified test files: ${env.MODIFIED_TESTS}"
            } else {
                env.MODIFIED_TESTS = ''
                echo "No modified test files detected."
            }
        }
    }
}

stage('Run Modified Tests') {
    when {
        expression {
            echo "Evaluating MODIFIED_TESTS: ${env.MODIFIED_TESTS}"
            return env.MODIFIED_TESTS?.trim()
        }
    }
    steps {
        script {
            def testFiles = env.MODIFIED_TESTS.split(',')
            for (file in testFiles) {
                echo "Running modified test: ${file}"
                sh "npx playwright test ${file} || true"
            }
        }
    }
}

        stage('Run Tagged Tests (Only if No Modified Tests)') {
            when {
                expression { return !env.MODIFIED_TESTS?.trim() }
            }
            steps {
                echo "No modified test files. Running tests with tag: ${params.TEST_TAG}"
                sh "npx playwright test --grep '${params.TEST_TAG}' || true"
            }
        }
    }
}
