# Backend project updates

## Update readme
1. Environment Setup
    1. Ensure that [default] profile is set in ~.aws/credentials
    2. Update make local with correct env params
1. Local testing (Deals)
   - Ensure that the following files are commented out
     - setup_test.go
     - deals_test.go
   - Add automated script to delete all mocks (sometimes causes test failures)
     - All files that start with mock\_
     ```
     find . -print | grep mock_
     ```
2. Project setup - Makefile local
   - Add instructions to request for env vars for the makefile
   - Allow reading of env vars from a gitignored file

## Developer Experience

1. Running tests in watch mode
   1. Install nodemon `npm install -g nodemon`
   2. Use the following command to run the tests in watch mode
      ```bash
      nodemon --watch ./ \
      --exec "make test" \
      -e go \
      --ignore 'mock_*.go'
      ```
   3. Use the following command to run a single test in watch mode
      ``` bash
      echo "Enter name of test:"
      read testName;
      echo "Enter containing folder of test:"
      read testFolder;
      nodemon --watch "./$testFolder" --exec "
      go test \
      -run "$testName" "./$testFolder/" \
      -v \
      -count 1" \
      -e go \
      --ignore 'mock_*.go'
      ```
