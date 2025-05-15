pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS' // Use the NodeJS installation configured in Jenkins
    }

    parameters { 
        string(name: 'TEST_TAG', defaultValue: '@smoke', description: 'Enter the test tag to execute (e.g., @smoke, @regression, @api)')
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
        
        stage('Run Playwright Tests') {
            steps {
                sh "npx playwright test --project=chromium --grep '${params.TEST_TAG}'"
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}

