import {Locator} from 'protractor';

declare module 'protractor' {
  export interface ProtractorBy {
    testId(id: RegExp | string, parentElement?: Element): Locator;
  }
}
