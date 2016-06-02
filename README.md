# jasmine-matcher-errors

Customize the error message reported by a custom jasmine matcher.

[![Build Status](https://travis-ci.org/deckar01/jasmine-matcher-errors.svg?branch=master)](https://travis-ci.org/deckar01/jasmine-matcher-errors)
[![Coverage Status](https://coveralls.io/repos/github/deckar01/jasmine-matcher-errors/badge.svg?branch=master)](https://coveralls.io/github/deckar01/jasmine-matcher-errors?branch=master)

## Why?

The message returned by a custom jasmine matcher is duplicated into the error object created for the failed spec. This results in error messages always being output twice.

![screenshot from 2016-06-01 09-04-53](https://cloud.githubusercontent.com/assets/3108007/15712848/85836b66-27d9-11e6-9fa4-4474118385c9.png)

Once you can customize the error message you could keep the message brief, and put more detailed information in the error message, or whatever makes sense for your custom matcher.

![screenshot from 2016-06-01 09-05-56](https://cloud.githubusercontent.com/assets/3108007/15712849/8584f102-27d9-11e6-9358-5e6fa49c6883.png)

## Setup

### Node

 - [Node + npm](https://docs.npmjs.com/getting-started/installing-node)


 1. Install from npm.
   - `npm install --save-dev jasmine-matcher-errors`
 2. Include in your custom matchers.
   - `require('jasmine-matcher-errors')`

### Browser

 - [Bower](http://bower.io/#install-bower)


 1. Install from bower.
   - `bower install --save-dev jasmine-matcher-errors`
 2. Include before your custom matchers.
   - `<script type="text/javascript" src="bower_components/jasmine-matcher-errors/src/index.js"></script>`


## Usage

### Jasmine v2

Add an error object to the return object of your custom matcher.

```js
jasmine.addMatchers({
  exampleMatcher: function() {
    return {
      compare: function(actual, expected) {
        ...
        return {
          pass: pass,
          message: message,
          error: new Error(message + '\n\n' + details)
        };
      }
    };
  }
});
```

### Jasmine v1

Add an error object to your custom matcher.

```js
this.addMatchers({
  exampleMatcher: function(expected) {
    ...
    this.message = message;
    this.error = new Error(message + '\n\n' + details);
    return pass;
  }
});
```
