/*! angular-color-this - v1.0.0 - 2015-05-20
* http://eknowles.github.io/angular-color-this/
* Copyright (c) 2015 ; Licensed  */

angular.module('ngColorThis', [])
  .factory('Color', function () {

    /**
     * Convert a string into RGB values
     * @param {String|Number|Boolean} string - An input string
     * @returns {Object} rgbObject - A color object
     */
    function convert(string, saltParam) {
      var r, g, b, rOffset, gOffset, bOffset;
      var output = '';
      var salt = saltParam;

      string = string.toString();

      for (var i = string.length - 1; i >= 0; i--) {
        var charAt = string.charCodeAt(i).toString().split('');
        for (var x = charAt.length - 1; x >= 0; x--) {
          var y = charAt[x] - salt;
          if (y < 4) y = parseInt(y) + 4;
          output += Math.pow(y * Math.round(y / 2), 8);
        }
      }

      if (output.length % 3 === 0) output = output.split('').reverse().join('');

      rOffset = Math.floor(output.length / 3);
      gOffset = rOffset * 2;
      bOffset = output.length - 3;

      r = toVal(output[rOffset], output[rOffset + 1], output[rOffset + 2]);
      g = toVal(output[gOffset], output[gOffset + 1], output[gOffset + 2]);
      b = toVal(output[bOffset], output[bOffset + 1], output[bOffset + 2]);

      return {red: r, green: g, blue: b};

    }

    function toVal(a, b, c) {
      var together = parseInt(a + b + c);
      while (together > 255) together = Math.round(together / 5);
      return together;
    }

    function rgbToCSS(red, green, blue) {
      return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    }

    return {
      convert: convert,
      toVal: toVal,
      rgbToCSS: rgbToCSS
    };

  })
  .directive('colorThis', ["Color", function (Color) {
    return {
      restrict: 'A',
      scope: {
        color: '=color',
        salt: '=colorSalt'
      },
      link: function (scope, element, attrs, fn) {

        scope.$watch('salt', function (newValue, oldValue) {
          if (newValue) {
            var rgb = Color.convert(scope.color, newValue);
            var css = Color.rgbToCSS(rgb.red, rgb.green, rgb.blue);
            element.css(attrs.colorThis, css);
          }
        });

        scope.$watch('color', function (newValue, oldValue) {
          if (newValue) {
            var rgb = Color.convert(newValue, scope.salt);
            var css = Color.rgbToCSS(rgb.red, rgb.green, rgb.blue);
            element.css(attrs.colorThis, css);
          }
        });
      }
    };
  }]);
