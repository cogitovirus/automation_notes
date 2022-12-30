const { Builder, until, By } = require('selenium-webdriver');

function createWebdriver(capabilities) {
  return new Builder()
    .withCapabilities(capabilities)
    .build();
}

const caps = {
  "browserName": "chrome",
  "goog:loggingPrefs": {
    "performance": "INFO",
    "browser": "SEVERE"
  }
}

/**
 * Logs all network errors from the performance log
 * @param {Webdriver} driver
 * @returns void
 */
async function logNetworkErrors(driver) {
  const performanceLogs = await driver.manage().logs().get('performance') || [];

  performanceLogs.forEach((log) => {
    const parsedLog = JSON.parse(log.message);

    const response = parsedLog.message.params.response;
    // log only 400 and 500 errors
    if (response && response.status > 400) {
      const failedRequestId = parsedLog.message.params.requestId;
      // find all logs related to the failed request
      const relatedLogs = performanceLogs.filter((log) => {
        return JSON.parse(log.message).message.params.requestId === failedRequestId;
      });
      // log all related logs
      relatedLogs.forEach((relatedLog) => {
        const parsedRelatedLog = JSON.parse(relatedLog.message);
        console.log(`NETWORK request ID: ${failedRequestId}, ${JSON.stringify(parsedRelatedLog, null, 2)}`)

      });
      //  finally, log the response
      console.log(`NETWORK request ID: ${failedRequestId}, ${JSON.stringify(parsedLog, null, 2)}\n`);
    }
  });
}

/**
 * Logs all browser console errors from the browser log
 * @param {Webdriver} driver
 * @returns void
 */
async function logBrowserConsoleErrors(driver) {
  const browserLogs = await driver.manage().logs().get('browser') || [];

  browserLogs.forEach((log) => {
    if (log.message) {
      console.log(`SEVERE message: ${log.message} \n`);
    }
  });
}

describe('A scraper test', function () {
  this.timeout(0);
  let driver;

  this.beforeEach(async () => {
    driver = await createWebdriver(caps);
  });

  it('should open a page', async function () {

    await driver.get('http://localhost:8080/');

    const button = await driver.findElement(By.id('centeredButton'));
    await button.click();

    await driver.wait(until.elementTextIs(button, 'Id: 1'), 10000);

  });

  this.afterEach(async () => {
    console.log('------------------')
    console.log(' Network errors: ')
    console.log('------------------')
    await logNetworkErrors(driver);
    console.log('------------------')
    console.log(' Browser console errors: ')
    console.log('------------------')
    await logBrowserConsoleErrors(driver);
    driver.quit();
  })
});









// withCapabilities(webdriver.Capabilities.chrome()).build();

// browser.get(‘http:/www.google.com’);

// var promise = browser_name.getTitle();

// promise.then(function(title)

// {

// console.log(title);

// });

// browser.quit();