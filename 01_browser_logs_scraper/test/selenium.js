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
  const driverLogsInterface = driver.manage().logs();
  const performanceLogs = await driverLogsInterface.get('performance');

  if (performanceLogs.length === 0) {
    console.log('No performance logs found');
    return Promise.resolve();
  }

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
        console.log(`requestID: ${failedRequestId}, ${JSON.stringify(parsedRelatedLog)}`)

      });
      //  finally, log the response
      console.log(`requestID: ${failedRequestId}, ${JSON.stringify(parsedLog)}\n`);
    }
  });
}

/**
 * Logs all browser console errors from the browser log
 * @param {Webdriver} driver
 * @returns void
 */
async function logBrowserConsoleErrors(driver) {
  const driverLogsInterface = driver.manage().logs();
  const browserLogs = await driverLogsInterface.get('browser');

  if (browserLogs.length === 0) {
    console.log('No browser logs found');
    return Promise.resolve();
  }

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