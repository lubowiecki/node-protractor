import {browser, protractor, ElementFinder} from 'protractor';

export class Wait {
  private constructor() {}

  /**
   * Stop test for the given amount of time
   */
  static async sleep(time = 500): Promise<void> {
    return browser.sleep(time);
  }

  /**
   * Wait for the element to be visible in browser window
   */
  static forElementInView(element: ElementFinder, waitTime = 5000): ElementFinder {
    browser.wait(protractor.ExpectedConditions.visibilityOf(element), waitTime, `Element taking too long to appear in the View`);
    return element;
  }
}
