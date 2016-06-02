/**
 * The matcher interface for the current version of Jasmine.
 * @member {string} factory The location of the jasmine matcher factory.
 * @member {string} error The location of the matcher error object.
 */
var JasmineMatcherInterface = function() {
  if(jasmine.Expectation) { // Jasmine ^2.0.0
    this.factory = 'jasmine.Expectation.prototype.wrapCompare';
    this.error = 'result.error';
  } else if(jasmine.Matchers) { // Jasmine ^1.0.0
    this.factory = 'jasmine.Matchers.matcherFn_';
    this.error = 'this.error';
  } else { // Unknown version of Jasmine
    throw Error(
      'Unsupported version of Jasmine\n' +
      'Please report any unexpected issues at ' +
      'https://github.com/deckar01/jasmine-matcher-errors/issues'
    );
  }
}

/**
 * Inject the custom matcher error logic into the current matcher interface.
 * @memberof JasmineMatcherInterface.prototype
 */
JasmineMatcherInterface.prototype.injectErrorPassing = function() {
  eval(
    this.factory + '=' +
    eval(this.factory).toString().replace(
      /message:\s*(\w+)(,?)\n/,
      'message: $1, error: ' + this.error + '$2\n'
    )
  );
};

// Inject the error passing logic into the current jasmine matcher factory.
new JasmineMatcherInterface().injectErrorPassing();
