pipeline {
    options {
        buildDiscarder(logRotator(
            numToKeepStr:        '5',
            artifactNumToKeepStr: '2',
            daysToKeepStr:       '15'
        ))
    }

    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.59.1-noble'
            args '--ipc=host'
        }
    }

    environment {
        CI         = 'true'
        DOCKER_ENV = 'true'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                // El archivo .env se inyecta como credencial "Secret file" en Jenkins
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
