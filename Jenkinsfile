pipeline {
  agent any

  environment {
      NODE_MODULES_EXISTS = 0
      EPOCH = 0
      CHANGED_FILES = ""
      PACKAGE_WAS_CHANGED = 0
  }

  stages {
    stage('Setup') {
        steps {
            script {
                NODE_MODULES_EXISTS = sh(script: "[ -d ./node_modules/ ]", returnStatus: true)
                CHANGED_FILES = sh(script:"git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD", returnStdout: true)
                PACKAGE_WAS_CHANGED = sh(script:"echo $changed_files | grep --quiet \"package.json\"", returnStatus: true)

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
