# #01 Automation Notes  - scraping browser logs
## Installation
The project is based on node.js so make sure you have it installed.

Remember to run the command listed below from the scraper folder, not the git repo root folder.

### Install dependencies
```sh
npm install
```
## Run the web server
This serves the web page that is used in the tests
```sh
node server.js
```
## Running tests

You need to have Chrome driver installed & available in your PATH. For more info see [here](https://chromedriver.chromium.org/getting-started)

To run tests:
```sh
npx mocha
```

