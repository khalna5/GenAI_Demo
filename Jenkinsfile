pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    parameters {
        string(name: 'TEST_TAG', defaultValue: '@risky', description: 'Enter test tag (e.g., @risky, @regression)')
    }

    environment {
        TEST_FILES = ''
        SHOULD_RUN_RISKY = 'false'
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

        stage('Get Modified Files') {
            steps {
                script {
                    def changedFiles = sh(
                        script: "git diff --name-only HEAD~1 HEAD",
                        returnStdout: true
                    ).trim().split("\n")

                    echo "Changed files: ${changedFiles}"

                    def testFiles = changedFiles.findAll { it.endsWith('.spec.js') || it.contains('test') }

                    if (testFiles && testFiles.size() > 0) {
                        env.TEST_FILES = testFiles.join(',')
                        echo "Tests to run: ${env.TEST_FILES}"
                    } else {
                        echo "No modified test files found. Will run tests with tag: ${params.TEST_TAG}"
                        env.SHOULD_RUN_RISKY = 'true'
                    }
                }
            }
        }

    stage('Run Selected Tests') {
    steps {
        script {
            if (env.SHOULD_RUN_RISKY == 'true') {
                echo "Running tests with tag: ${params.TEST_TAG}"
                sh "npx playwright test --grep '${params.TEST_TAG}'"
            } else if (env.TEST_FILES?.trim()) {
                def tests = env.TEST_FILES.split(',')
                for (t in tests) {
                    echo "Running test: ${t}"
                    sh "npx playwright test ${t}"
                }
            } else {
                echo "No tests to run."
            }
        }
    }
}
    }