import {browser} from 'protractor';

export class LocalStorage {
  private constructor() {}

  /**
   * Clear browser local storage
   */
  static async clear(): Promise<void> {
    await browser.executeScript('window.localStorage.clear();');
  }
}
