// Copyright (c) 2008-2011 Pivotal Labs
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

global.j$ = jasmine;

function Matchers(env, actual, spec, opt_isNot) {
  //TODO: true dependency: equals, contains
  this.env = env;
  this.actual = actual;
  this.spec = spec;
  this.isNot = opt_isNot || false;
}

Matchers.wrapInto_ = function(prototype, matchersClass) {
  for (var methodName in prototype) {
    var orig = prototype[methodName];
    matchersClass.prototype[methodName] = Matchers.matcherFn_(methodName, orig);
  }
};

Matchers.matcherFn_ = function(matcherName, matcherFunction) {
  return function() {
    var matcherArgs = j$.util.argsToArray(arguments);
    var result = matcherFunction.apply(this, arguments);

    if (this.isNot) {
      result = !result;
    }

    var message;
    if (!result) {
      if (this.message) {
        message = this.message.apply(this, arguments);
        if (j$.isArray_(message)) {
          message = message[this.isNot ? 1 : 0];
        }
      } else {
        var englishyPredicate = matcherName.replace(/[A-Z]/g, function(s) { return ' ' + s.toLowerCase(); });
        message = "Expected " + j$.pp(this.actual) + (this.isNot ? " not " : " ") + englishyPredicate;
        if (matcherArgs.length > 0) {
          for (var i = 0; i < matcherArgs.length; i++) {
            if (i > 0) message += ",";
            message += " " + j$.pp(matcherArgs[i]);
          }
        }
        message += ".";
      }
    }

    this.spec.addExpectationResult(result, {
      matcherName: matcherName,
      passed: result,
      expected: matcherArgs.length > 1 ? matcherArgs : matcherArgs[0],
      actual: this.actual,
      message: message
    });
    return void 0;
  };
};

module.exports = Matchers;
