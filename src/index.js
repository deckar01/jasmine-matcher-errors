eval(
  'jasmine.Expectation.prototype.wrapCompare = ' +
  jasmine.Expectation.prototype.wrapCompare.toString()
  .replace(/message:\s*(\w+),\n/, 'message: $1, error: result.error,\n')
);
