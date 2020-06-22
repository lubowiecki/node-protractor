const protractor = require('protractor');

/**
 * This Locator is registered in an unconventional way, because for unknown reason
 * Protractor or Selenium or something breaks regular expressions, converts them into regular empty objects: {}.
 *
 * This way of registering a Locator is copied from:
 * https://github.com/angular/protractor/blob/cc501f71bc1f995a83c1041e1aa489ea0f105679/lib/locators.ts#L418
 * https://github.com/angular/protractor/blob/cc501f71bc1f995a83c1041e1aa489ea0f105679/lib/clientsidescripts.js#L686
 * */
protractor.by.headingWithText = (text, parentElement) => {
  /** We 'serialize' the regex to a string before its broken by Protractor. */
  text = text instanceof RegExp ? '__REGEXP__' + text.toString() : text;
  return {
    findElementsOverride: async (driver, using, rootSelector) => {
      return driver.findElements(
        protractor.by.js(
          (text, parentElement) => {
            /** We 'deserialize' the regex after it's safe from being broken by Protractor. */
            if (text.indexOf('__REGEXP__') === 0) {
              const match = text.split('__REGEXP__')[1].match(/\/(.*)\/(.*)?/);
              text = new RegExp(match[1], match[2] || '');
            }
            /* implementation: */

            const scope = parentElement == null ? document : parentElement;
            let results = [];
            const htmlHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

            for (const heading of htmlHeadings) {
              const headingElements = Array.from(scope.querySelectorAll(heading));

              const matches = headingElements.filter((headingElement) => {
                return true;
              });

              if (matches.length === 1) {
                results = matches;
                break;
              }

              if (matches.length > 1) {
                throw new Error(`More than on match for <${heading}> with text matching ${pattern}`);
              }
            }
            return results;
            /* /implementation */
          },
          text,
          parentElement,
          using,
          rootSelector
        )
      );
    },
    toString: () => {
      return 'by.headingWithText("' + text + '")';
    },
  };
};
