pipeline {
  agent any

  environment {
      NODE_MODULES_EXISTS = 0
      PACKAGE_WAS_CHANGED = 0
      SERVERLESS_WAS_CHANGED = 0
      SRC_WAS_CHANGED = 0
      PUBLIC_WAS_CHANGED = 0
      WEB_BUCKET = "staging-projects.nikitas.link"
      REPORT_BUCKET = "staging-projects.nikitas.link-reports"
      REPORT_BUCKET_PRODUCTION = "projects.nikitas.link-reports"
      REPORT_BUCKET_STAGING = "staging-projects.nikitas.link-reports"
      DEPLOYMENT_STAGE = "staging"
      HOSTED_ZONE_NAME = "nikitas.link"
      UA_SECRET = "${env.STAGING_SAMPLE_DEV_SITE_UASECRET}"
      CERTID = "${env.STAGING_SAMPLE_DEV_SITE_CERTID}"
      NUMBER_OF_COMMITS = 0

      SETUP_END = "."
      TEST_END = "."
      INFRASTRUCTURE_DEPLOYMENT_END = "."
      INFRASTRUCTURE_TESTING_END = "."
      BUILDING_END = "."
      DEPLOYMENT_END = "."
  }

  stages {
    stage('Setup') {
        steps {
            script {
                if (env.GIT_BRANCH == "origin/master-production") {
                  echo "THIS IS A PRODUCTION BUILD"
                  WEB_BUCKET = "projects.nikitas.link"
                  REPORT_BUCKET = "projects.nikitas.link-reports"
                  DEPLOYMENT_STAGE = "production"
                  UA_SECRET = "${env.PRODUCTION_SAMPLE_DEV_SITE_UASECRET}"
                  CERTID = "${env.PRODUCTION_SAMPLE_DEV_SITE_CERTID}"
                }

                NUMBER_OF_COMMITS = sh(script: 'git log ${GIT_PREVIOUS_COMMIT}..${GITCOMMIT} --pretty=oneline | wc -l', returnStdout: true).trim()
                echo "number of commits: ${NUMBER_OF_COMMITS}"
                NODE_MODULES_EXISTS = sh(script: "[ -d ./node_modules/ ]", returnStatus: true)
                echo "previous commit: ${env.GIT_PREVIOUS_COMMIT}"
                echo "current commit: ${env.GIT_COMMIT}"
                PACKAGE_WAS_CHANGED = sh(script:'echo $(git diff --name-only ${GIT_PREVIOUS_COMMIT} ${GIT_COMMIT}) | grep --quiet "package.json"', returnStatus: true)
                echo "package was changed? ${PACKAGE_WAS_CHANGED}"
                SERVERLESS_WAS_CHANGED = sh(script:'echo $(git diff --name-only ${GIT_PREVIOUS_COMMIT} ${GIT_COMMIT}) | grep --quiet "deployment/*"', returnStatus: true)
                echo "serverless was changed? ${SERVERLESS_WAS_CHANGED}"
                SRC_WAS_CHANGED = sh(script:'echo $(git diff --name-only ${GIT_PREVIOUS_COMMIT} ${GIT_COMMIT}) | grep --quiet "src/*"', returnStatus: true)
                echo "src was changed? ${SRC_WAS_CHANGED}"
                PUBLIC_WAS_CHANGED = sh(script:'echo $(git diff --name-only ${GIT_PREVIOUS_COMMIT} ${GIT_COMMIT}) | grep --quiet "public/*"', returnStatus: true)
                echo "public was changed? ${PUBLIC_WAS_CHANGED}"


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

                SETUP_END = "${currentBuild.timeInMillis}"
            }
        }
    }
    stage('Test') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'npm run test-CI-json'
        script {
          TEST_END = "${currentBuild.timeInMillis}"
        }
      }
    }

    stage('Infrastructure Deployment') {
        steps {
            script {
                if (SERVERLESS_WAS_CHANGED == 0 || DEPLOYMENT_STAGE == "production") {
                    // 0 means it WAS changed
                    echo "Running serverless deploy"
                    sh "cd deployment/ && sls deploy --stage ${DEPLOYMENT_STAGE} --account ${env.AWS_ACCOUNT_NUMBER} --bucket ${WEB_BUCKET} --uasecret ${UA_SECRET} --certid ${CERTID} --logbucket ${env.LOGBUCKET_NAME} --hzname ${HOSTED_ZONE_NAME}"
                    sh "bash ./deployment/create-reports-folder.sh ${REPORT_BUCKET}"
                } else {
                    echo "serverless was the same since last commit. skipping serverless deploy"
                }

                INFRASTRUCTURE_DEPLOYMENT_END = "${currentBuild.timeInMillis}"
            }
        }
    }

    stage('Infrastructure Testing') {
        steps {
            sh "bash ./deployment/test-all.sh --web-bucket ${WEB_BUCKET} --report-bucket ${REPORT_BUCKET}"
            script {
              INFRASTRUCTURE_TESTING_END = "${currentBuild.timeInMillis}"
            }
        }
    }

    stage('Building') {
        steps {
            script {
              if (SRC_WAS_CHANGED == 0 || PUBLIC_WAS_CHANGED == 0 || DEPLOYMENT_STAGE == "production") {
                echo "Source was changed, or in production stage. running build"
                sh 'npm run build'
                sh 'bash ./scripts/gzipAll.sh'
              } else {
                echo "Skipping build since source has not changed"
              }

              BUILDING_END = "${currentBuild.timeInMillis}"
            }
        }
    }

    stage('Deployment') {
        steps {
          script {
            if (SRC_WAS_CHANGED == 0 || PUBLIC_WAS_CHANGED == 0 || DEPLOYMENT_STAGE == "production") {
              echo "Source was changed, or in production stage. running deployment to s3 bucket"
              sh "aws s3 rm s3://${WEB_BUCKET} --recursive"
              // remove all items from website before updating it
              sh "bash ./scripts/deployAll.sh --bucket=${WEB_BUCKET} --ttl=public,max-age=20"
            } else {
              echo "Skipping deployment since source has not changed"
            }

            DEPLOYMENT_END = "${currentBuild.timeInMillis}"
          }
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
      sh "node runReport.js --current-commit ${env.GIT_COMMIT} --stages Setup,${SETUP_END},Test,${TEST_END},Infrastructure_Deployment,${INFRASTRUCTURE_DEPLOYMENT_END},Infrastructure_Testing,${INFRASTRUCTURE_TESTING_END},Building,${BUILDING_END},Deployment,${DEPLOYMENT_END} --num-commits ${NUMBER_OF_COMMITS} --branch ${env.GIT_BRANCH} --build-start ${currentBuild.startTimeInMillis} --build-duration ${currentBuild.duration} --coverage-path coverage/clover.xml --build-status ${currentBuild.result} > latest.json"
      script {
        if (DEPLOYMENT_STAGE == "staging") {
          // if in staging we want to send a report to both the production bucket
          // (because this is still a build, and we want to see a history of builds)
          // as well as the staging bucket for testing the infrastructure
          sh "bash ./scripts/sendReport.sh --report-bucket ${REPORT_BUCKET_STAGING} --project-name ${env.JOB_NAME} --dont-delete true"    
        }
      }
      sh "bash ./scripts/sendReport.sh --report-bucket ${REPORT_BUCKET_PRODUCTION} --project-name ${env.JOB_NAME}"
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
