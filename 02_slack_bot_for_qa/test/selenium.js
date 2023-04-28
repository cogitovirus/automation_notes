const { Builder, until, By } = require('selenium-webdriver');

function createWebdriver(capabilities) {
  return new Builder()
    .withCapabilities(capabilities)
    .build();
}

const caps = {
  "browserName": "edge",
  "goog:loggingPrefs": {
    "performance": "INFO",
    "browser": "SEVERE"
  }
}

describe('A scraper test', function () {
  this.timeout(0);
  let driver;

  this.beforeEach(async () => {
    driver = await createWebdriver(caps);
  });

  it('should open a page', async function () {

    await driver.get('http://google.com/');

  });

  this.afterEach(async () => {
    console.log('------------------')
    driver.quit();
  })
});
