define(function() {
  'use strict';

  var deepExtend = function(destination, source) {
    /* Deep merge of objects.
     * See: http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
     *
     * Altough, jQuery provides ``jQuery.extend``, which is also able to deep
     * merge objects, we need this method here, because the dependency on
     * jQuery throws errors on mockup initialization via grunt, where the
     * dependencies are not fully resolved. Underscore is also providing a
     * merging function, but theirs do not allow deep merging.
     */
      for (var property in source) {
        if (source[property] && source[property].constructor && source[property].constructor === Object) {
          destination[property] = destination[property] || {};
          destination[property] = deepExtend(destination[property], source[property]);
        } else {
          destination[property] = source[property];
        }
      }
      return destination;
    };

  return {
    deepExtend: deepExtend
  };
});
