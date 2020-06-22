import * as urlParser from 'url';
import {browser} from 'protractor';

export class Url {
  /**
   * Get current pathname
   */
  static async getCurrentPath(): Promise<string> {
    const currentUrl = await browser.getCurrentUrl();
    return urlParser.parse(currentUrl).pathname || '';
  }

  /**
   * Check if the current pathname matches the pattern
   */
  static async isCurrentPath(pattern: RegExp): Promise<boolean> {
    const path = await this.getCurrentPath();
    return pattern.test(path);
  }
}
