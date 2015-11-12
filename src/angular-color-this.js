angular
  .module('ngColorThis', [])
  .factory('Color', () => {
    /**
     * Convert a string into RGB values
     * @param {String|Number|Boolean} string - An input string
     * @param {Number} saltParam - Random variation of color
     * @returns {Object} rgbObject - A color object
     */
    function convert(string, saltParam) {
      let {r, g, b, rOffset, gOffset, bOffset } = 0, output = '', salt = saltParam ? parseInt(saltParam) : -5;
      string = string.toString();
      for (var i = string.length - 1; i >= 0; i--) {
        const charAt = string.charCodeAt(i).toString().split('');
        for (var x = charAt.length - 1; x >= 0; x--) {
          let y = charAt[x] - salt;
          if (y < 4)
            y = parseInt(y) + 4;
          output += Math.pow(y * Math.round(y / 2), 8);
        }
      }
      if (output.length % 3 === 0)
        output = output.split('').reverse().join('');
      rOffset = Math.floor(output.length / 3);
      gOffset = rOffset * 2;
      bOffset = output.length - 3;
      r = toVal(output[rOffset], output[rOffset + 1], output[rOffset + 2]);
      g = toVal(output[gOffset], output[gOffset + 1], output[gOffset + 2]);
      b = toVal(output[bOffset], output[bOffset + 1], output[bOffset + 2]);
      return {
        red: r,
        green: g,
        blue: b
      };
    }

    function toVal(a, b, c) {
      let together = parseInt(a + b + c);
      while (together > 255)
        together = Math.round(together / 5);
      return together;
    }

    function rgbToCSS(red, green, blue) {
      return `rgb(${ red }, ${ green }, ${ blue })`;
    }

    return {
      convert: convert,
      toVal: toVal,
      rgbToCSS: rgbToCSS
    };
  })
  .directive('colorThis', Color => {
    return {
      restrict: 'A',
      scope: {
        color: '=color',
        salt: '=colorSalt'
      },
      link(scope, element, attrs, fn) {
        scope.$watch('color', (newValue, oldValue) => {
          if (newValue) {
            const rgb = Color.convert(newValue);
            const css = Color.rgbToCSS(rgb.red, rgb.green, rgb.blue, 50);
            element.css(attrs.colorThis, css);
          }
        }, false);
      }
    };
  });
