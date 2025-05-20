pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    parameters {
        string(name: 'TEST_TAG', defaultValue: '@risky', description: 'Enter test tag (e.g., @risky, @regression)')
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

                    if (testFiles) {
                        env.TEST_FILES = testFiles.join(',')
                        echo "Tests to run: ${env.TEST_FILES}"
                    } else {
                        currentBuild.result = 'SUCCESS'
                        error("No relevant changes to test")
                    }
                }
            }
        }

        stage('Run Selected Tests') {
            when {
                expression { return env.TEST_FILES }
            }
            steps {
                script {
                    def tests = env.TEST_FILES.split(',')
                    for (t in tests) {
                        echo "Running test for: ${t}"
                        sh "echo Running test logic for ${t}"
                    }
                }
            }
        }
    }
}

