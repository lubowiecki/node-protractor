const protractor = require('protractor');

/**
 * This Locator is registered in an unconventional way, because for unknown reason
 * Protractor or Selenium or something breaks regular expressions, converts them into regular empty objects: {}.
 *
 * This way of registering a Locator is copied from:
 * https://github.com/angular/protractor/blob/cc501f71bc1f995a83c1041e1aa489ea0f105679/lib/locators.ts#L418
 * https://github.com/angular/protractor/blob/cc501f71bc1f995a83c1041e1aa489ea0f105679/lib/clientsidescripts.js#L686
 * */
protractor.by.inputWithLabel = (label, parentElement) => {
  /** We 'serialize' the regex to a string before its broken by Protractor. */
  label = label instanceof RegExp ? '__REGEXP__' + label.toString() : label;
  return {
    findElementsOverride: async (driver, using, rootSelector) => {
      return driver.findElements(
        protractor.by.js(
          (label, parentElement) => {
            /** We 'deserialize' the regex after it's safe from being broken by Protractor. */
            if (label.indexOf('__REGEXP__') === 0) {
              const match = label.split('__REGEXP__')[1].match(/\/(.*)\/(.*)?/);
              label = new RegExp(match[1], match[2] || '');
            }
            /* implementation: */
            const scope = parentElement == null ? document : parentElement;
            const labelElements = scope.querySelectorAll('label');
            const matchingLabels = Array.from(labelElements).filter((labelElement) => {
              if (typeof label === 'string') {
                return labelElement.innerText === label;
              }
              return label.test(labelElement.innerText);
            });
            return matchingLabels.map((matchingLabel) => {
              const labelFor = matchingLabel.getAttribute('for');
              let input;
              if (labelFor != null) {
                input = document.getElementById(labelFor);
              } else {
                input = matchingLabel.querySelector('input, textarea, select, button');
              }
              return input;
            });
            /* /implementation */
          },
          label,
          parentElement,
          using,
          rootSelector
        )
      );
    },
    toString: () => {
      return 'by.inputWithLabel("' + label + '")';
    },
  };
};
