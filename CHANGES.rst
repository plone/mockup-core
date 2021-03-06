Changelog
=========

v2.1.13 - unreleased
--------------------

- Fix the recursive override for corner case
  [frapell]


v2.1.12 - 2015-09-15
--------------------

- revert recursive option override
  [vangheem]

v2.1.11 - 2015-09-15
--------------------

- Fix overriding default pattern parameters when initializing
  [frapell]
- Change logging statements for pattern missing name or trigger from warn into info
  [fulv]


v2.1.10 - 2015-07-14
--------------------

- always log exception on pattern initialization errors
  [vangheem]

v2.1.9 - 2015-05-31
-------------------

- Add karma config to run tests on Jenkins
  [gforcada]

- Update to jQuery 1.11.3.
  [thet]


v2.1.8 - 2015-05-05
-------------------

- Update more framework dependencies.
  [thet]

- Update to jQuery 1.11.2.
  [thet]

- Update Bootstrap to 3.3.4.
  [thet]

- Remove Dropzone sed and copy parts. New Dropzone doesn't use these resources.
  [thet]


v2.1.7 - 2015-04-01
-------------------

- Upgrade to patternslib 2.0.9 to fix install error.
  [vangheem]


v2.1.6 - 2015-03-31
-------------------

- Don't swallow errors, when ``window.DEBUG`` is set to true.
  [thet]

- Replace TinyMCE's default content.min.css with one, that can be found by
  builded bundles.
  [thet]


v2.1.5 - 2015-03-09
-------------------

- Enable a way to bypass the mockup parser. Useful when using the Base pattern
  with the Patternslib parser.
  [jcbrand]

- Fix tinymce-fonts sed task matching urls with and without single quotes
  [petschki]


v2.1.4 - 2015-03-03
-------------------

- Bring back TinyMCE ``sed`` and ``copy`` from ``mockup`` into ``mockup-core``.
  If we create bundles from an external package based on patterns from mockup,
  we don't want to care about the sed and copy tasks too. Instead, those should
  be defined on the patterns itself, but thats for a future release.
  [thet]


v2.1.3 - 2015-02-11
-------------------

- go back to patternslib registry
  [jcbrand]

v2.1.1 - 2015-02-10
-------------------

- fix initialize of pattern to be global also
  [vangheem]


v2.1.0 - 2015-02-10
-------------------

- Fork patternslib registry to work with mockup's use-case a bit better.
  See https://github.com/Patternslib/Patterns/issues/396
  [vangheem]


v2.0.0 - 2015-02-04
-------------------

- Patternslib merge: Removed the Mockup registry in favor of Patternslib's.
  This allows us to: Use Patternslib patterns with Mockup/Plone and use Mockup
  patterns with Patternslib outside of Plone. Refs: #25
  [jcbrand]


v1.2.16 - 2015-01-24
--------------------

- upgrade sauce karma package
  [vangheem]

- Relicensing from MIT to BSD. Refs #24
  [thet]


v1.2.15 - 2014-11-24
--------------------

- Move TinyMCE sed and copy task configuration over to Mockup.
  [thet]

- Add CSS resource map and rename the JavaScript one.
  [thet]


v1.2.14 - 2014-11-10
--------------------

- Trigger the event 'scan-completed.registry.mockup-core' on document after the
  DOM pattern scan was completed and all patterns were initialized. This way,
  we can register event subscribers, which rely on the DOM manipulations by
  other patterns.
  [thet]


v1.2.13 - 2014-10-28
--------------------

- Add a `less/docs.less` file (from `mockup`), which other projects can depend
  on, without copying it over.
  [thet]


v1.2.12 - 2014-10-24
--------------------

* Bower updates, except reactjs.
  [thet]

* Cleanup: Remove uglifying config for ``*._develop.js`` files - they are not
  used anymore. Move all NixOS plattform specific ``*.nix`` config files to a
  ``.nix`` subdirectory.
  [thet]

* Don't include Configuration and License section in docs, if they aren't
  defined.
  [thet]

* Fix Makefile for node versions < and >= 0.11.x.
  [petschki, thet]

* Remove licensing and author information from source files.
  Refs https://github.com/plone/mockup/issues/422
  [thet]

* Fix more TinyMCE related paths.
  [thet]

v1.2.11 - 2014-08-13
--------------------

* only jshint in test directory
  [vangheem]

v1.2.10 - 2014-08-13
--------------------

* dependency version upgrades.
  [thet]

v1.2.9 - 2014-08-12
-------------------

* upgrade to jQuery 1.11.1
  [thet]

* fix tests and better karma reporting
  [thet]

v1.2.8 - 2014-08-11
-------------------

* finish removing jscs
  [vangheem]

v1.2.7 - 2014-08-10
-------------------

* correctly generate js min and dev files with maps
  [vangheem]

v1.2.6 - 2014-08-10
-------------------

* fix tests to work with latest mockup
  [vangheem]

* do not use jscs anymore
  [vangheem]


v1.2.4 - 2014-04-19
-------------------

* tinymce icons/font packaging fixed
  [garbas]


v1.2.3 - 2014-03-31
-------------------

* update bower packages:
   - react: 0.8.0 -> 0.10.0


v1.2.2 - 2014-03-31
-------------------

* update Saucelabs browser definitions
  [garbas]

* update bower packages:
   - sinon: 1.8.2 -> 1.9.0


v1.2.1 - 2014-03-30
-------------------

* add selectivizr, a utility that emulates CSS3 pseudo-classes and attribute
  selectors in Internet Explorer 6-8
  [garbas]

* all files in tests/ and js/ folder are now included in karma test runner
  [garbas]

* update node packages:
    - coveralls: 2.8.0 -> 2.10.0
    - grunt: 0.4.3 -> 0.4.4
    - grunt-contrib-jshint: 0.8.0 -> 0.9.2
    - grunt-contrib-less: 0.10.0 -> 0.11.0
    - grunt-jscs-checker: 0.4.0 -> 0.4.1
    - grunt-karma: 0.8.0 -> 0.8.2
    - karma: 0.12.0 -> 0.12.1
    - karma-coverage: 0.2.0 -> 0.2.1
    - karma-mocha: 0.1.1 -> 0.1.3
    - karma-sauce-launcher: 0.2.0 -> 0.2.4
    - mocha: 1.17.1 -> 1.18.2


v1.2.0 - 2014-03-25
-------------------

* karma/lib/config.js now also found when using nix
  [garbas]

* run multiple travis jobs for 2 browsers at the time
  [garbas]

* fixed typo in js/docs/view.js
  [garbas]

* add watcher for less files
  [garbas]

* make sure the router can find the pattern div
  [davisagli]


v1.1.1 - 2014-03-12
-------------------

* jscs linter added
  [garbas]

* fix grunthelper script
  [garbas]


v1.1.0 - 2014-03-12
-------------------

* update to bootstrap 3.1.0
  [garbas]

* move grunt helper script to mockup-core (from mockup) repository
  [garbas]


v1.0.1 - 2014-02-05
-------------------

* if the pattern file uses windows line endings (CRLF) remove the CR so the
  still matches.
  [domruf]

* DocsApp fix for loading patterns. Now it loads pattern as 'text!' using url
  and pattern via requirejs name registered in requirejs paths.
  [garbas]


v1.0.0 - 2014-01-21
-------------------

* Initial release.
  [garbas]
