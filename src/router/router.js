var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    console.log('Router initialize');
    this.on('route', function (route) {
      console.log('[router]: ', route);
    });
    this.newsItem = new app.newsItem();
    this.userView = new app.userView();
    this.newsView = new app.newsView();
  },
  routes: {
    '': 'home',
    'item/:id': 'item',
    'user/:user': 'user'
  },
  home: function () {
    this.newsView.render();
  },
  item: function (id) {
    this.newsItem.render(id);
  },
  user: function (user) {
    this.userView.render(user);
  }
});
