#!/usr/bin/env bash
# d
function usage()
{
  local just_help=$1
  local missing_required=$2
  local invalid_argument=$3
  local invalid_option=$4

  local help="Usage: test-all.sh [OPTIONS]

[ENTER YOUR DESCRIPTION HERE]

Example: test-all.sh [ENTER YOUR EXAMPLE ARGUMENTS HERE]

Options (* indicates it is required):"
  local help_options="    \ \--web-bucket \<Parameter>\[ENTER YOUR DESCRIPTION HERE]
    \ \--report-bucket \<Parameter>\[ENTER YOUR DESCRIPTION HERE]
"

  if [ "$missing_required" != "" ]
  then
    echo "Missing required argument: $missing_required"
  fi

  if [ "$invalid_option" != "" ] && [ "$invalid_value" = "" ]
  then
    echo "Invalid option: $invalid_option"
  elif [ "$invalid_value" != "" ]
  then
    echo "Invalid value: $invalid_value for option: --$invalid_option"
  fi

  echo -e "
"
  echo "$help"
  echo "$help_options" | column -t -s'\'
  return
}
function init_args()
{
REQ_ARGS=()

# get command line arguments
POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
	--web-bucket)
		web_bucket="$2"
		shift 2
		;;
	--report-bucket)
		report_bucket="$2"
		shift 2
		;;
	*)
		POSITIONAL+=("$1") # saves unknown option in array
		shift
		;;
esac
done

for i in "${REQ_ARGS[@]}"; do
  # $i is the string of the variable name
  # ${!i} is a parameter expression to get the value
  # of the variable whose name is i.
  req_var=${!i}
  if [ "$req_var" = "" ]
  then
    usage "" "--$i"
    exit
  fi
done
}
init_args $@


function expect_equals() {
    local opt_1="$1"
    local opt_2="$2"

    if [ "$opt_1" == "$opt_2" ]
    then
        echo "OK"
    else
        echo "TEST FAILED"
        echo "$opt_1 =/= $opt_2"
        exit 1
    fi
}

echo "Testing if website bucket $web_bucket exists:"
result="$(aws s3api head-bucket --bucket $web_bucket 2>&1)"
expect_equals $result ""

echo "Testing if website bucket $web_bucket is a website:"
result="$(aws s3api get-bucket-website --bucket $web_bucket 2>&1)"
expect_equals "${result:0:1}" "{"

echo "Testing if report bucket $report_bucket exists:"
result="$(aws s3api head-bucket --bucket $report_bucket 2>&1)"
expect_equals $result ""

echo "Testing if report bucket $report_bucket has a folder named reports/ in the root"
result="$(aws s3api head-object --bucket $report_bucket --key reports/ 2>&1)"
expect_equals "${result:0:1}" "{"
# echo "Testing if website bucket $web_bucket is a website:"
# result="$(aws s3api get-bucket-website --bucket $web_bucket 2>&1)"
# expect_equals "${result:0:1}" "{"
