angular
  .module('ngColorThis', [])
  .factory('Color', function () {

    /**
     *
     * @param str
     * @returns {string}
     */
    function convert(str) {
      var r, g, b, rOffset, gOffset, bOffset;
      var output = '';
      var salt = -5;

      str = str.toString();

      for (var i = str.length - 1; i >= 0; i--) {
        var charAt = str.charCodeAt(i).toString().split('');
        for (var x = charAt.length - 1; x >= 0; x--) {
          var y = charAt[x] - salt;
          if (y < 4) {
            y = parseInt(y) + 4;
          }
          output += Math.pow(y * Math.round(y / 2), 8);
        }
      }

      if (output.length % 3 === 0) {
        output = output.split('').reverse().join('');
      }

      rOffset = Math.floor(output.length / 3);
      gOffset = rOffset * 2;
      bOffset = output.length - 3;

      r = toVal(output[rOffset], output[rOffset + 1], output[rOffset + 2]);
      g = toVal(output[gOffset], output[gOffset + 1], output[gOffset + 2]);
      b = toVal(output[bOffset], output[bOffset + 1], output[bOffset + 2]);

      return 'rgb(' + r + ', ' + g + ', ' + b + ')';

    }

    /**
     * Takes 3 numbers and returns a number under 255
     * @param {Number} a
     * @param {Number} b
     * @param {Number} c
     * @returns {Number}
     */
    function toVal(a, b, c) {
      var together = parseInt(a + b + c);

      while (together > 255) {
        together = Math.round(together / 5);
      }

      return together;
    }

    return {
      convert: convert,
      toVal: toVal
    };

  })
  .directive('colorThis', function (Color) {

    return {
      restrict: 'A',
      scope: {
        color: '='
      },
      link: function (scope, element, attrs, fn) {

        scope.$watch('color', function (newValue, oldValue) {
          if (newValue) {
            element.css(attrs.colorThis, Color.convert(newValue));
          }
        }, true);

      }
    };

  });
