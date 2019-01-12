pipeline {
    agent any

    stages {
        stage('Build Task Manager Frontend') {
            steps {
                echo 'Building Task Manager Frontend..'
                bat 'cd ./TaskManagerFrontend/ && npm install && npm run build --prod'
            }
        }
        stage('Build Task Manager Backend') {
            steps {
                echo 'Building Task Manager Backend ..'
                bat 'cd ./TaskManagerBackend/ && npm install --no-optional && npm run build'
            }
        }
        stage('Testing Task Manager Frontend') {
            steps {
                echo 'Testing Task Manager Frontend...'
                bat 'npm install pm2 -g'
                bat 'pm2 start ./TaskManagerBackend/index.js'
                bat 'cd ./TaskManagerFrontend/ && npm test --single-run true --watch=false' 
                bat 'pm2 stop index'               
            }
        }
        stage('Testing Task Manager Backend') {
            steps {
                echo 'Testing Backend...'
                bat 'cd ./TaskManagerBackend/ && npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                bat 'docker-compose up --build -d'
            }
        }
    }
}