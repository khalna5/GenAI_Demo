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

        stage('Get Modified Test Files') {
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

                    if (testFiles) {
                        env.MODIFIED_TESTS = testFiles.join(',')
                        echo "Modified test files: ${env.MODIFIED_TESTS}"
                    } else {
                        echo "No modified test files detected."
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    if (env.MODIFIED_TESTS) {
                        // Run only the modified tests, optionally with tag
                        def testFiles = env.MODIFIED_TESTS.split(',')
                        for (file in testFiles) {
                            echo "Running modified test: ${file}"
                            sh "npx playwright test ${file} --grep '${params.TEST_TAG}' || true"
                        }
                    } else {
                        // No modified test files, fallback to tag-based run
                        echo "No modified test files found. Running tests by tag: ${params.TEST_TAG}"
                        sh "npx playwright test --grep '${params.TEST_TAG}'"
                    }
                }
            }
        }
    }
}
