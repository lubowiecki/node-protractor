import {browser, logging} from 'protractor';

export class Logs {
  private constructor() {}

  /**
   * Clear browser console logs
   */
  static async clear(): Promise<void> {
    await browser.manage().logs().get(logging.Type.BROWSER);
  }

  /**
   * Run test that expects no errors are logged in browser console
   */
  static async expectNoErrors(): Promise<boolean> {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    return expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  }
}
