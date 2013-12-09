define([
  'expect',
  'sinon',
  'backbone',
  'mockup-docs-router'
], function(expect, sinon, Backbone, Router) {
  "use strict";

  window.mocha.setup('bdd');

  describe("Docs:Router", function () {

    // Default option: Trigger and replace history.
    var opts = {trigger: true, replace: true};

    beforeEach(function() {
      // Stub route methods.
      sinon.stub(Router.prototype, "page");
      sinon.stub(Router.prototype, "pattern");

      this.$app = $("<div></div>");

      // Create router with stubs and manual fakes.
      this.router = new Router({
        app: {
          $el: this.$app,
          defaultPage: 'front-page',
          patterns: {
            first: function() { return 'first-pattern'; }
          }
        }
      });

      // Start history to enable routes to fire.
      Backbone.history.start({silent: true});

      // Spy on all route events.
      this.routerSpy = sinon.spy();
      this.router.on("route", this.routerSpy);
    });

    afterEach(function() {
      Backbone.history.stop();
      Router.prototype.page.restore();
      Router.prototype.pattern.restore();
    });

    it("can route to a page", function() {
      this.router.navigate("some-page", opts);
      expect(Router.prototype.page.calledOnce).to.be(true);
      expect(Router.prototype.page.calledWithExactly("some-page")).to.be(true);
      expect(this.routerSpy.calledOnce).to.be(true);
      expect(this.routerSpy.calledWith("page", ["some-page"])).to.be(true);
    });

    it("routes to default page", function() {
      this.router.navigate("", opts);
      expect(Router.prototype.page.calledOnce).to.be(true);
      expect(Router.prototype.page.calledWithExactly('front-page')).to.be(true);
      expect(this.routerSpy.calledOnce).to.be(true);
      expect(this.routerSpy.calledWith("defaultPage")).to.be(true);
    });

    it("can route to a pattern", function() {
      this.router.navigate("pattern/some-pattern", opts);
      expect(Router.prototype.pattern.calledOnce).to.be(true);
      expect(Router.prototype.pattern.calledWithExactly("some-pattern")).to.be(true);
      expect(this.routerSpy.calledOnce).to.be(true);
      expect(this.routerSpy.calledWith("pattern", ["some-pattern"])).to.be(true);
    });

    it("routes to first pattern", function() {
      this.router.navigate("pattern", opts);
      expect(Router.prototype.pattern.calledOnce).to.be(true);
      expect(Router.prototype.pattern.calledWithExactly('first-pattern')).to.be(true);
      expect(this.routerSpy.calledOnce).to.be(true);
      expect(this.routerSpy.calledWith("defaultPattern")).to.be(true);
    });

    it("will display view inside $content element", function() {
      this.router.show.apply(this.router, [{
        render: function() {
          return {
            $el: $("<h2>Something</h2>")
          };
        }
      }]);
      expect(this.$app.html()).to.equal('<h2>Something</h2>');
    });

    it("will store current view", function() {
      expect(this.router.currentView).to.equal(undefined);
      this.router.show.apply(this.router, [{
        render: function() {
          return {
            $el: $("<h2>Something</h2>")
          };
        }
      }]);
      expect(this.router.currentView.render().$el.html()).to.equal('Something');
    });

  });

});
