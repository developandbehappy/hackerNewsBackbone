var app = app || {};
var Backbone = Backbone || {};

app.userView = Backbone.View.extend({
  initialize: function () {

  },
  render: function (userId) {
    var self = this;
    self.clearContent();
    $.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json').then(function (response) {
      console.log('response', response);
      self.renderItemData(response);
      self.renderComment(response);
    }, function (error) {
      console.log('error', error);
    });
  }
});