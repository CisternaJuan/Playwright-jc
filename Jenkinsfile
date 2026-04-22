pipeline {
    options {
        buildDiscarder(logRotator(
            numToKeepStr:         '20',
            artifactNumToKeepStr: '5',
            daysToKeepStr:        '30'
        ))
    }

    agent any

    environment {
        CI         = 'true'
        DOCKER_ENV = 'true'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Test') {
            steps {
                withCredentials([file(credentialsId: 'playwright-env-file', variable: 'ENV_FILE')]) {
                    sh 'cp $ENV_FILE .env'
                    sh 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                allowMissing         : false,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                reportName           : 'Playwright Report'
            ])
        }
    }
}
