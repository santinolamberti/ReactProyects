pipeline {
    image: node:10

    stages {
        stage('Build') {
        only:
          - main
            steps {
              echo "Ejecutando build "
              cd Frontend/auto-app
              npm cache clean --force
              rm -rf node_modules && rm ./package-lock.json && npm install --force
              npm run build --serverTimeout 60000
        artifacts:
          paths:
            Frontend/auto-app/build/
            }
        }
        stage('Test') {
          only:
            main
            steps {
                echo "Running unit tests... This will take about 60 seconds."
            }
        stage('Deploy') {
          dependencies:
            build
            steps {
                aws --version
                aws s3 rm s3://$S3_BUCKET --recursive
                aws s3 cp Frontend/auto-app/build/ s3://$S3_BUCKET --recursive --include "*"
            }

    }
}

