describe('ngColorThis', function () {

  beforeEach(module('ngColorThis'));

  describe('Color Service', function () {

    var Color;

    beforeEach(inject(function (_Color_) {
      Color = _Color_;
    }));

    it('should load the service', function () {
      expect(Color).toBeDefined();
    });

    it('should return any 3 three strings as a number less than 256', function () {
      expect(Color.toVal('9', '9', '9')).toBeLessThan(256);
    });

    it('should return a join if give three strings joined < 256', function () {
      expect(Color.toVal('1', '9', '9')).toEqual(199);
    });

    it('should return and object with rgb values', function () {
      var convertTest = Color.convert('test');
      expect(convertTest).toEqual(jasmine.any(Object));
      expect(convertTest.red).toBeDefined();
      expect(convertTest.green).toBeDefined();
      expect(convertTest.blue).toBeDefined();
      expect(convertTest.red).toBeLessThan(256);
      expect(convertTest.green).toBeLessThan(256);
      expect(convertTest.blue).toBeLessThan(256);
    });

    it('should return a pretty string for rgb values', function () {
      var rgbToCSS = Color.rgbToCSS(255, 255, 255);
      expect(rgbToCSS).toBe('rgb(255, 255, 255)');
    });

  });

});
