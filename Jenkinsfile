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
        RUN_TESTS = false  // Flag to track whether tests need to be run
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
                    // Get the list of changed files
                    def changedFiles = sh(
                        script: "git diff --name-only HEAD~1 HEAD",
                        returnStdout: true
                    ).trim().split("\n")

                    echo "Changed files: ${changedFiles}"

                    // Find modified test files
                    def testFiles = changedFiles.findAll { it.endsWith('.spec.js') || it.contains('test') }

                    // If modified test files exist, set them as TEST_FILES
                    if (testFiles && testFiles.size() > 0) {
                        env.TEST_FILES = testFiles.join(',')
                        env.RUN_TESTS = true  // Flag to indicate that there are tests to run
                        echo "Modified test files to run: ${env.TEST_FILES}"
                    } else {
                        // If no modified test files, set the flag to run risky tests
                        echo "No modified test files found. Will run tests with tag: ${params.TEST_TAG}"
                        env.SHOULD_RUN_RISKY = 'true'
                    }
                }
            }
        }

        stage('Run Selected Tests') {
            steps {
                script {
                    if (env.RUN_TESTS == 'true') {
                        // Run the modified test files
                        def tests = env.TEST_FILES.split(',')
                        for (t in tests) {
                            echo "Running modified test: ${t}"
                            sh "npx playwright test ${t}"
                        }
                    } else if (env.SHOULD_RUN_RISKY == 'true') {
                        // If no modified files, run tests with the @risky tag
                        echo "Running tests with tag: ${params.TEST_TAG}"
                        sh "npx playwright test --grep '${params.TEST_TAG}'"
                    } else {
                        echo "No tests to run."
                        currentBuild.result = 'SUCCESS'  // Explicitly mark as success if no tests need to run
                    }
                }
            }
        }
    }
}
