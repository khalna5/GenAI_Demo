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
                    def changedFiles = sh(
                        script: "git diff --name-only HEAD~1 HEAD",
                        returnStdout: true
                    ).trim().split("\n")

                    echo "Changed files: ${changedFiles}"

                    def testFiles = changedFiles.findAll {
                        it.endsWith('.spec.js') || it.contains('test')
                    }

                    if (testFiles && testFiles.size() > 0) {
                        env.MODIFIED_TESTS = testFiles.join(',')
                        echo "Modified test files: ${env.MODIFIED_TESTS}"
                    } else {
                        echo "No modified test files detected."
                        env.MODIFIED_TESTS = ''
                    }
                }
            }
        }

        stage('Run Modified Tests') {
            when {
                expression { return env.MODIFIED_TESTS?.trim() }
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
