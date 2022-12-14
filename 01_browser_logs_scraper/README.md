# #01 Automation Notes  - scraping browser logs
## Installation
Project is based on node.js so make sure you have it installed.
### Install dependencies
```sh
npm install
```
## Run the web server
This serves the web page that is used in the tests.
```sh
node server.js
```
## Running tests

You need to have chrome driver installed & available in your PATH. For more info see [here](https://chromedriver.chromium.org/getting-started)

To run tests:
```sh
npx mocha
```

