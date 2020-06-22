import {Locator} from 'protractor';

declare module 'protractor' {
  export interface ProtractorBy {
    headingWithText(pattern: RegExp | string, parentElement?: Element): Locator;
  }
}
