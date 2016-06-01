describe("jasmine-error-matchers", function() {
  var wrapCompare = jasmine.Expectation.prototype.wrapCompare;

  beforeEach(function() {
    require('../../src/index.js');
  });

  afterEach(function() {
    jasmine.Expectation.prototype.wrapCompare = wrapCompare;

    // Force node to evaluate the module contents by clearing the require cache.
    delete require.cache[require.resolve('../../src/index.js')];
  });

  it("should be allow custom error messages", function() {
    var testMatcher = function() {
      return {
        compare: function(actual, expected) {
          return {
            pass: false,
            message: 'message',
            error: new Error('error message')
          };
        }
      };
    };
    var expectation = new jasmine.Expectation({
      actual: 'actual',
      customMatchers: {testMatcher: testMatcher}
    });
    spyOn(expectation, 'addExpectationResult');

    expectation.testMatcher('expected');

    expect(expectation.addExpectationResult).toHaveBeenCalledWith(
      false,
      {
        matcherName: 'testMatcher',
        passed: false,
        message: 'message',
        error: jasmine.any(Error),
        actual: 'actual',
        expected: 'expected'
      }
    );
    var error = expectation.addExpectationResult.calls.argsFor(0)[1].error;
    expect(error.message).toBe('error message');
  });

  it("should allow not supplying a custom error", function() {
    var testMatcher = function() {
      return {
        compare: function(actual, expected) {
          return {
            pass: false,
            message: 'message'
          };
        }
      };
    };
    var expectation = new jasmine.Expectation({
      actual: 'actual',
      customMatchers: {testMatcher: testMatcher}
    });
    spyOn(expectation, 'addExpectationResult');

    expectation.testMatcher('expected');

    expect(expectation.addExpectationResult).toHaveBeenCalledWith(
      false,
      {
        matcherName: 'testMatcher',
        passed: false,
        message: 'message',
        error: undefined,
        actual: 'actual',
        expected: 'expected'
      }
    );
  });
});
