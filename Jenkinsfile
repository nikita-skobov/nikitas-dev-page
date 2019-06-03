pipeline {
  agent any

  environment {
      NODE_MODULES_EXISTS = 0
      PACKAGE_WAS_CHANGED = 0
      SERVERLESS_WAS_CHANGED = 0
  }

  stages {
    stage('Setup') {
        steps {
            echo "${env.AWS_ACCOUNT_NUMBER}"
            script {
                NODE_MODULES_EXISTS = sh(script: "[ -d ./node_modules/ ]", returnStatus: true)
                echo "${GIT_PREVIOUS_COMMIT}"
                echo "${GIT_COMMIT}"
                PACKAGE_WAS_CHANGED = sh(script:'echo $(git diff --name-only ${GIT_PREVIOUS_COMMIT} ${GIT_COMMIT}) | grep --quiet "package.json"', returnStatus: true)
                echo "package was changed? ${PACKAGE_WAS_CHANGED}"

                if (NODE_MODULES_EXISTS == 1) {
                    // 1 means it does NOT exist
                    echo "node modules does not exist. running npm install"
                } else if (PACKAGE_WAS_CHANGED == 0) {
                    // 0 means it WAS changed
                    echo "package.json has changed. running npm install"
                    sh 'npm install'
                } else {
                    echo "package.json is the same as it was last time. skipping npm install"
                }
            }
        }
    }
    stage('Test') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'npm run test-CI-json'
      }
    }

    stage('Infrastructure Deployment') {
        steps {
            script {
                SERVERLESS_WAS_CHANGED = sh(script:'echo $(git diff --name-only ${GIT_PREVIOUS_COMMIT} ${GIT_COMMIT}) | grep --quiet "deployment/*"', returnStatus: true)
                echo "serverless was changed? ${PACKAGE_WAS_CHANGED}"

                if (SERVERLESS_WAS_CHANGED == 0) {
                    // 0 means it WAS changed
                    echo "serverless was changed"
                    sh "cd deployment/ && sls deploy --stage staging --account ${AWS_ACCOUNT_NUMBER} --bucket staging-projects.nikitas.link --uasecret ${STAGING_SAMPLE_DEV_SITE_UASECRET} --certid ${STAGING_SAMPLE_DEV_SITE_CERTID} --logbucket ${LOGBUCKET_NAME} --hzname nikitas.link"
                } else {
                    echo "serverless was the same since last commit. skipping serverless deploy"
                }
            }
        }
    }
  }

  post {
    always {
      echo 'maybe delete some stuff here?'
      sh 'echo $(ls)'
      sh 'sudo npm update -g local-badges'
      sh "npm run badges -- ${currentBuild.result}"
      // sh 'node /home/linaro/Desktop/coverage/node_modules/coverage-badger/lib/cli.js -e 90 -g 65 -r ./coverage/clover.xml -d ./reports/'
      // sh 'sudo curl http://localhost:8080/buildStatus/icon?job=react-redux-jest-template -o ./reports/buildstatus.svg'
    }
    success {
      echo 'Nice!!!'
    }
    unstable {
      echo 'Are we unstable?? why?'
    }
    failure {
      echo 'Im a failure :('
    }
  }
}
