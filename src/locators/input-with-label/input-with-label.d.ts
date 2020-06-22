import {Locator} from 'protractor';

declare module 'protractor' {
  export interface ProtractorBy {
    inputWithLabel(label: string | RegExp, parentElement?: Element): Locator;
  }
}
