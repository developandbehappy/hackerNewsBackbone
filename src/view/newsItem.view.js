var app = app || {};
var Backbone = Backbone || {};

app.newsItem = Backbone.View.extend({
  initialize: function () {

  },
  render: function (id) {
    var self = this;
    self.clearContent();
    $.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json').then(function (response) {
      self.renderItemData(response);
    }, function (error) {
      console.log('error', error);
    });
  },
  clearContent: function () {
    $('.content').html('');
  },
  renderItemData: function (item) {
    console.log('item', item);
    var itemData = this.templateItemData(item);
    $('.content').html(itemData);
    app.events.trigger('loaderHide');
  },
  templateItemData: function (context) {
    var source = $("#postItemTpl").html();
    var template = Handlebars.compile(source);
    return template(context);
  },

});