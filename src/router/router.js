var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    console.log('Router initialize');
    this.on('route', function (route) {
      console.log('[router]: ', route);
    });
    this.newsView = new app.newsView();
    this.newsView.render();
  },
  routes: {
    '': 'home'
  },
  home: function () {
    console.log('Hello world!');
  }
});
