var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    console.log('Router initialize');
    this.on('route', function (route) {
      console.log('[router]: ', route);
    });
    this.newsItem = new app.newsItem();
    this.newsView = new app.newsView();
  },
  routes: {
    '': 'home',
    'item/:id': 'item'
  },
  home: function () {
    this.newsView.render();
  },
  item: function (id) {
    this.newsItem.render(id);
  }
});
