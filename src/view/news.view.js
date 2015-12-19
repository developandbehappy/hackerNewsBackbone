var app = app || {};
var Backbone = Backbone || {};

app.newsView = Backbone.View.extend({
  el: 'body',
  initialize: function () {

  },
  render: function () {
    var self = this;
    this.data = [];
    $.get("https://hacker-news.firebaseio.com/v0/topstories.json", function (data) {
      self.data = data;
    });
  }
});
