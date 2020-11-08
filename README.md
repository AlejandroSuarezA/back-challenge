# back-challenge

## Project Structure

    ├── data                    # Json simulating database collections
    ├── src                     # Source files (alternatively `lib` or `app`)
         ├── collections        # Database access 
         ├── enums              # Enums defining error and promocode types
         ├── app.js             # Endpoints
         └── calculator.js      # Discount calculator      
    ├── test                    # Automated tests for the api and calculator
    └── README.md


## Scripts

Run `test` to execute jest with `--coverage` flag.
Run `start` start the express server on `localhost:3000`.

## Github actions

Action on each push to master to run all test suites
