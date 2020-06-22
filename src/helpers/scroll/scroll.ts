import {browser, ElementFinder} from 'protractor';

export class Scroll {
  private constructor() {}

  /**
   * Scroll page to the provided element
   */
  static async toElement(element: ElementFinder): Promise<void> {
    await browser.executeScript('arguments[0].scrollIntoView();', element.getWebElement());
  }
}
