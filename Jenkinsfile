pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    parameters {
        choice(name: 'TEST_MODE', choices: ['modified', 'tag'], description: 'Choose whether to run modified files or tag-based tests')
        string(name: 'TEST_TAG', defaultValue: '@risky', description: 'Tag for test selection (used only if TEST_MODE=tag)')
    }

    environment {
        PUSH_TO_GITHUB = 'false'
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

        stage('Install Playwright Chromium') {
            steps {
                sh 'npx playwright install chromium'
            }
        }

        stage('Determine Tests to Run') {
            steps {
                script {
                    if (params.TEST_MODE == 'modified') {
                        def changedFiles = sh(
                            script: "git diff --name-only HEAD~1 HEAD",
                            returnStdout: true
                        ).trim().split("\n")

                        def testFiles = changedFiles.findAll { 
                            it.endsWith('.spec.js') || it.contains('test')
                        }

                        if (testFiles && testFiles.size() > 0) {
                            env.TEST_FILES = testFiles.join(',')
                            env.PUSH_TO_GITHUB = 'true'
                            echo "Modified test files: ${env.TEST_FILES}"
                        } else {
                            currentBuild.result = 'SUCCESS'
                            error("No modified test files found.")
                        }
                    } else {
                        echo "Running tests with tag: ${params.TEST_TAG}"
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    if (params.TEST_MODE == 'modified') {
                        def tests = env.TEST_FILES.split(',')
                        for (t in tests) {
                            echo "Running modified test: ${t}"
                            sh "npx playwright test ${t} --project=chromium"
                        }
                    } else {
                        sh "npx playwright test --grep '${params.TEST_TAG}' --project=chromium"
                    }
                }
            }
        }

        stage('Push to GitHub') {
            when {
                expression { return env.PUSH_TO_GITHUB == 'true' }
            }
            steps {
                script {
                    sh '''
                        git add .
                        git diff --cached --quiet || git commit -m "Auto: Commit from Jenkins modified test run"
                        git push origin HEAD:main
                    '''
                }
            }
        }
    }
}
