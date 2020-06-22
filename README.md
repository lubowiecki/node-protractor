# node-protractor

- [node-protractor](#node-protractor)
  - [Helpers](#helpers)
    - [Local storage](#local-storage)
      - [clear() {#localStorage}](#clear-localstorage)
    - [Logs](#logs)
      - [clear() {#logs}](#clear-logs)
      - [expectNoErrors()](#expectnoerrors)
    - [Scroll](#scroll)
      - [toElement()](#toelement)
    - [Url](#url)
      - [getCurrentPath()](#getcurrentpath)
      - [isCurrentPath(pattern: RegExp)](#iscurrentpathpattern-regexp)
    - [VisualRegression](#visualregression)
      - [Config {#visualRegression}](#config-visualregression)
      - [checkScreen(tag: string, lang: Langs, options?: SaveScreenMethodOptions)](#checkscreentag-string-lang-langs-options-savescreenmethodoptions)
      - [checkFullPageScreen(tag: string, lang: Langs, options?: SaveFullPageMethodOptions)](#checkfullpagescreentag-string-lang-langs-options-savefullpagemethodoptions)
    - [Wait](#wait)
      - [sleep(time: number)](#sleeptime-number)
      - [forElementInView(element: ElementFinder, waitTime = 5000)](#forelementinviewelement-elementfinder-waittime--5000)
  - [Locators](#locators)
    - [Config {#locators}](#config-locators)
      - [testId(id: RegExp | string, parentElement?: Element)](#testidid-regexp--string-parentelement-element)
      - [headingWithText(pattern: RegExp | string, parentElement?: Element)](#headingwithtextpattern-regexp--string-parentelement-element)
      - [inputWithLabel(label: string | RegExp, parentElement?: Element)](#inputwithlabellabel-string--regexp-parentelement-element)

## Helpers

### Local storage

#### clear() {#localStorage}

Clear browser local storage

```typescript
await LocalStorage.clear();
```

### Logs

#### clear() {#logs}

Clear browser console logs

```typescript
await Logs.clear();
```

#### expectNoErrors()

Run test that expects no errors are logged in browser console

```typescript
await Logs.expectNoErrors();
```

### Scroll

#### toElement()

Scroll page to the provided element

```typescript
await Scroll.toElement();
```

### Url

#### getCurrentPath()

Get current pathname

```typescript
await Url.getCurrentPath();
```

#### isCurrentPath(pattern: RegExp)

Check if the current pathname matches the pattern

```typescript
await Url.isCurrentPath(/home/);
```

### VisualRegression

#### Config {#visualRegression}

Add 'protractor-image-comparison' plugin configuration in your protractor.conf.js

```typescript
exports.config = {
  plugins: [
    {
      package: 'protractor-image-comparison',
      options: {
        formatImageName: `{tag}-{logName}-{width}x{height}`,
        baselineFolder: join(process.cwd(), './e2e/goldens/'),
        screenshotPath: join(process.cwd(), '/e2e/.tmp/'),
        savePerInstance: true,
        disableCSSAnimation: true,
        autoSaveBaseline: true,
        clearRuntimeFolder: true,
      },
    },
  ],
};
```

#### checkScreen(tag: string, lang: Langs, options?: SaveScreenMethodOptions)

Compares an image of a viewport

```typescript
await VisualRegression.checkScreen('screenName', 'pl');
```

#### checkFullPageScreen(tag: string, lang: Langs, options?: SaveFullPageMethodOptions)

Compares an image of a page

```typescript
await VisualRegression.checkFullPageScreen('pageName', 'pl');
```

### Wait

#### sleep(time: number)

Stop test for the given amount of time in miliseconds

```typescript
await Wait.sleep(500);
```

#### forElementInView(element: ElementFinder, waitTime = 5000)

Wait for the element to be visible in browser window

```typescript
await Wait.forElementInView(element(by.css('h1')));
```

## Locators

### Config {#locators}

Add locators configuration in your protractor.conf.js

```typescript
exports.config = {
  onPrepare() {
    require('@lubowiecki/node-protractor/dist/locators');
  },
};
```

#### testId(id: RegExp | string, parentElement?: Element)

Find element by test-id

```html
<div test-id="myName"></div>
```

```typescript
const myDiv = element(by.testId('myName'));
```

#### headingWithText(pattern: RegExp | string, parentElement?: Element)

Find heading that matches pattern

```html
<h1>My title</h1>
```

```typescript
const myHeading = element(by.headingWithText('My title'));
```

#### inputWithLabel(label: string | RegExp, parentElement?: Element)

Find input with label that matches pattern

```html
<label for="myInput">My label</label> <input id="myInput" />
```

```typescript
const myInput = element(by.inputWithLabel('My label'));
```
