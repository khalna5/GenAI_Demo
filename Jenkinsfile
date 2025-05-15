pipeline {
agent any

tools {
nodejs 'NodeJS'
}

parameters {
string(name: 'TEST_TAG', defaultValue: '@smoke', description: 'Enter test tag (e.g., @smoke, @regression)')
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

stage('Get Modified Tests') {
steps {
script {
// Capture modified test files
def changedFiles = sh(script: "git fetch origin main && git diff --name-only origin/main...HEAD | grep 'tests/.*\\.spec\\.[jt]s$' || true", returnStdout: true).trim()
if (changedFiles) {
env.MODIFIED_TESTS = changedFiles.split("\\r?\\n").join(" ")
echo "Modified test files: ${env.MODIFIED_TESTS}"
} else {
echo "No modified test files found."
env.MODIFIED_TESTS = ''
}
}
}
}

stage('Run Playwright Tests') {
when {
expression { return env.MODIFIED_TESTS?.trim() }
}
steps {
sh "npx playwright test ${env.MODIFIED_TESTS}"
}
}
}

post {
always {
archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
}
}
}