pipeline {
  agent any

  environment {
      NODE_MODULES_EXISTS = 0
      PACKAGE_WAS_CHANGED = 0
      SERVERLESS_WAS_CHANGED = 0
      WEB_BUCKET = "staging-projects.nikitas.link"
      REPORT_BUCKET = "staging-projects.nikitas.link-reports"
      REPORT_BUCKET_MASTER = "projects.nikitas.link-reports"
  }

  stages {
    stage('Setup') {
        steps {
            echo "${env.AWS_ACCOUNT_NUMBER}"
            script {
                echo "${GIT_BRANCH}"
                if (GIT_BRANCH == "master-production") {
                  echo "change web and report bucket"
                }


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
                    sh "bash ./deployment/create-reports-folder.sh staging-projects.nikitas.link-reports"
                } else {
                    echo "serverless was the same since last commit. skipping serverless deploy"
                }
            }
        }
    }

    stage('Infrastructure Testing') {
        steps {
            sh "bash ./deployment/test-all.sh --web-bucket staging-projects.nikitas.link --report-bucket staging-projects.nikitas.link-reports"
        }
    }

    stage('Building') {
        steps {
            sh 'npm run build'
            sh 'bash ./scripts/gzipAll.sh'
        }
    }

    stage('Deploying') {
        steps {
            sh 'aws s3 rm s3://staging-projects.nikitas.link --recursive'
            // remove all items from website before updating it
            sh 'bash ./scripts/deployAll.sh --bucket=staging-projects.nikitas.link --ttl=public,max-age=20'
        }
    }
  }

  post {
    always {
      echo 'maybe delete some stuff here?'
      sh 'echo $(ls)'
      sh 'sudo npm update -g local-badges'
      // sh "npm run badges -- ${currentBuild.result}"
      // sh "aws s3 cp ./badges/ s3://staging-projects.nikitas.link-reports/reports/${env.JOB_NAME}/badges/ --recursive --cache-control public,max-age=20"
      sh "node runReport.js --coverage-path coverage/clover.xml --build-status ${currentBuild.result} > latest.json"
      sh "bash ./scripts/sendReport.sh --report-bucket staging-projects.nikitas.link-reports --project-name ${env.JOB_NAME}"
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
