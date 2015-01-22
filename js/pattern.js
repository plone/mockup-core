/* Base Pattern
 */


define([
  'jquery',
  'pat-registry',
  "pat-logger"
], function($, Registry, logger) {
  'use strict';

  // Base Pattern
  var Base = function($el, options) {
    this.$el = $el;
    this.options = $.extend(true, {}, this.defaults || {}, options || {});
    this.init();
    this.emit('init');
  };

  Base.prototype = {
    is_mockup_pattern: true,
    constructor: Base,
    on: function(eventName, eventCallback) {
      this.$el.on(eventName + '.' + this.name + '.patterns', eventCallback);
    },
    emit: function(eventName, args) {
      // args should be a list
      if (args === undefined) {
        args = [];
      }
      this.$el.trigger(eventName + '.' + this.name + '.patterns', args);
    }
  };

  Base.extend = function(NewPattern) {
    var Base = this, Constructor;
    if (NewPattern && NewPattern.hasOwnProperty('constructor')) {
      Constructor = NewPattern.constructor;
    } else {
      Constructor = function() { Base.apply(this, arguments); };  // TODO: arguments from where
    }
    var Surrogate = function() { this.constructor = Constructor; };
    Surrogate.prototype = Base.prototype;
    Constructor.prototype = new Surrogate();
    Constructor.extend = Base.extend;
    Constructor.init = function initMockup($el, name, trigger, options) {
      name = name || this.prototype.name;
      var log = logger.getLogger("pat." + name);
      var pattern = $el.data('pattern-' + name);
      if (pattern === undefined && Registry.patterns[name]) {
        try {
            pattern = new Registry.patterns[name]($el, Registry.getOptions($el, name, options));
        } catch (e) {
            log.error('Failed while initializing "' + name + '" pattern.');
        }
        $el.data('pattern-' + name, pattern);
      }
      return pattern;
    };
    $.extend(true, Constructor.prototype, NewPattern);
    Constructor.__super__ = Base.prototype;  // TODO: needed?
    Registry.register(Constructor);
    return Constructor;
  };

  return Base;
});
