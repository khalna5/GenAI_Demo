pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    parameters {
        string(name: 'TEST_TAG', defaultValue: '@risky', description: 'Fallback tag if no test files changed')
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

                    def testFiles = changedFiles.findAll {
                        it.endsWith('.spec.js') || it.contains('test')
                    }

                    if (testFiles && testFiles.size() > 0) {
                        env.TEST_MODE = 'SELECTED'
                        env.TEST_FILES = testFiles.join(',')
                        echo "Detected test file changes: ${env.TEST_FILES}"
                    } else {
                        env.TEST_MODE = 'risky'
                        echo "No test files modified. Will run tests tagged with '${params.TEST_TAG}'"
                    }
                }
            }
        }
        
        stage('Run Tests (Chrome only)') {
            steps {
                script {
                    if (env.TEST_MODE == 'SELECTED') {
                        def files = env.TEST_FILES.split(',')
                        for (f in files) {
                            echo "Running modified test in Chrome: ${f}"
                            sh "npx playwright test ${f} --project=chromium"
                        }
                    } else {
                        echo "Running risky tests in Chrome with tag ${params.TEST_TAG}"
                        sh "npx playwright test --grep '${params.TEST_TAG}' --project=chromium"
                    }
                }
            }
        }
    }
}

