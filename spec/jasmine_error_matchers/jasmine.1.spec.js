describe("jasmine v1.x.x matcher errors", function() {
  var Expectation = jasmine.Expectation;

  beforeEach(function() {
    delete jasmine.Expectation;
    jasmine.Matchers = require('../mocks/jasmine/Matchers.js');

    require('../../src/index.js');
    jasmine.Expectation = Expectation;

    this.env = jasmine.createSpy('env');
    this.spec = jasmine.createSpyObj('spec', ['addExpectationResult']);
  });

  afterEach(function() {
    delete jasmine.Matchers;

    // Force node to evaluate the module contents by clearing the require cache.
    delete require.cache[require.resolve('../../src/index.js')];
    delete require.cache[require.resolve('../mocks/jasmine/Matchers.js')];
  });

  it("should be allow custom error messages", function() {
    var testMatcher =  function(expected) {
      this.message = function(){ return 'message'; };
      this.error = new Error('error message');
      return false;
    };
    jasmine.Matchers.wrapInto_({testMatcher: testMatcher}, jasmine.Matchers);
    var matchers = new jasmine.Matchers(this.env, 'actual', this.spec);

    matchers.testMatcher('expected');

    expect(this.spec.addExpectationResult).toHaveBeenCalledWith(
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
    var error = this.spec.addExpectationResult.calls.argsFor(0)[1].error;
    expect(error.message).toBe('error message');
  });

  it("should allow not supplying a custom error", function() {
    var testMatcher =  function(expected) {
      this.message = function(){ return 'message'; };
      return false;
    };
    jasmine.Matchers.wrapInto_({testMatcher: testMatcher}, jasmine.Matchers);
    var matchers = new jasmine.Matchers(this.env, 'actual', this.spec);

    matchers.testMatcher('expected');

    expect(this.spec.addExpectationResult).toHaveBeenCalledWith(
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
