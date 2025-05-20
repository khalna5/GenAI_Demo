pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    parameters {
        string(name: 'TEST_TAG', defaultValue: '@risky', description: 'Enter test tag (e.g., @risky, @regression)')
    }

    environment {
        PUSH_TO_GITHUB = false
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
                sh 'npx playwright test ${t} --project=chromium'
            }
        }

        stage('Determine Test Scope') {
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
                        env.TEST_MODE = "modified"
                        env.TEST_FILES = testFiles.join(',')
                        echo "Modified test files to run: ${env.TEST_FILES}"
                    } else {
                        env.TEST_MODE = "tag"
                        echo "No modified test files. Will run tests with tag: ${params.TEST_TAG}"
                    }
                }
            }
        }

        stage('Run Selected Tests') {
            steps {
                script {
                    if (env.TEST_MODE == "modified") {
                        def tests = env.TEST_FILES.split(',')
                        for (t in tests) {
                            echo "Running modified test: ${t}"
                            sh "npx playwright test ${t}"
                        }
                        env.PUSH_TO_GITHUB = true
                    } else {
                        echo "Running tests with tag ${params.TEST_TAG}"
                        sh "npx playwright test --grep '${params.TEST_TAG}'"
                    }
                }
            }
        }

        stage('Push to GitHub') {
            when {
                expression { return env.PUSH_TO_GITHUB == "true" }
            }
            steps {
                script {
                    sh '''
                        git config user.name "jenkins-bot"
                        git config user.email "jenkins@example.com"
                        git add .
                        git commit -m "Auto: Update after modified test run"
                        git push origin HEAD:main
                    '''
                }
            }
        }
    }
}
