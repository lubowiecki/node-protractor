import {browser} from 'protractor';
import {ImageCompareResult} from 'webdriver-image-comparison';
import {SaveFullPageMethodOptions} from 'webdriver-image-comparison/build/commands/fullPage.interfaces';
import {SaveScreenMethodOptions} from 'webdriver-image-comparison/build/commands/screen.interfaces';

export class VisualRegression {
  private constructor() {}

  /**
   * Compares an image of a viewport
   */
  static async checkScreen<Langs>(tag: string, lang: Langs, options?: SaveScreenMethodOptions): Promise<number | ImageCompareResult> {
    return browser.imageComparison.checkScreen(`${tag}-${lang}`, options);
  }

  /**
   * Compares an image of a page
   */
  static async checkFullPageScreen<Langs>(
    tag: string,
    lang: Langs,
    options?: SaveFullPageMethodOptions
  ): Promise<number | ImageCompareResult> {
    return browser.imageComparison.checkFullPageScreen(`${tag}-${lang}`, options);
  }
}
