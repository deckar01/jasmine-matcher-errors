describe("jasmine version unknown matcher errors", function() {

  it("should throw an error on unsupported jasmine versions", function() {
      var Expectation = jasmine.Expectation;

      function unknownRequire() {
        try {
          delete jasmine.Expectation;
          require('../../src/index.js');
        } catch(e) {
          jasmine.Expectation = Expectation;
          throw e;
        }
      }

      expect(unknownRequire).toThrowError(/Unsupported version of Jasmine/);
  });

  it("should throw an error when jasmine is missing", function() {
      var jasmineObject = jasmine;

      function missingRequire() {
        try {
          delete global.jasmine;
          require('../../src/index.js');
        } catch(e) {
          jasmine = jasmineObject;
          throw e;
        }
      }

      expect(missingRequire).toThrowError(/jasmine is not defined/);
  });
});
