const protractor = require('protractor');

/**
 * This Locator is registered in an unconventional way, because for unknown reason
 * Protractor or Selenium or something breaks regular expressions, converts them into regular empty objects: {}.
 *
 * This way of registering a Locator is copied from:
 * https://github.com/angular/protractor/blob/cc501f71bc1f995a83c1041e1aa489ea0f105679/lib/locators.ts#L418
 * https://github.com/angular/protractor/blob/cc501f71bc1f995a83c1041e1aa489ea0f105679/lib/clientsidescripts.js#L686
 * */
protractor.by.testId = (id, parentElement) => {
  /** We 'serialize' the regex to a string before its broken by Protractor. */
  id = id instanceof RegExp ? '__REGEXP__' + id.toString() : id;
  return {
    findElementsOverride: async (driver, using, rootSelector) => {
      return driver.findElements(
        protractor.by.js(
          (id, parentElement) => {
            /** We 'deserialize' the regex after it's safe from being broken by Protractor. */
            if (id.indexOf('__REGEXP__') === 0) {
              const match = id.split('__REGEXP__')[1].match(/\/(.*)\/(.*)?/);
              id = new RegExp(match[1], match[2] || '');
            }
            /* implementation: */
            const scope = parentElement == null ? document : parentElement;
            let results = [];

            const matches = Array.from(scope.querySelectorAll(`[test-id="${id}"]`));

            if (matches.length === 1) {
              results = matches;
            }

            if (matches.length > 1) {
              throw new Error(`More than on match for test-id="${id}"`);
            }

            return results;
            /* /implementation */
          },
          id,
          parentElement,
          using,
          rootSelector
        )
      );
    },
    toString: () => {
      return 'by.testId("' + id + '")';
    },
  };
};
