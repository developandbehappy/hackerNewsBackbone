var app = app || {};
var Backbone = Backbone || {};

app.newsItem = Backbone.View.extend({
  initialize: function () {

  },
  render: function (id, comment) {
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
  templateItemData: function (context) {
    var source = $("#postItemTpl").html();
    var template = Handlebars.compile(source);
    return template(context);
  },
  templateItemComment: function (context) {
    var source = $("#postItemComment").html();
    var template = Handlebars.compile(source);
    return template(context);
  },
  getContent: function () {
    return $('.content');
  },
  renderItemData: function (item) {
    var itemData = this.templateItemData(item);
    this.responseArray(item.kids);
    var html = itemData; // Рендер html
    this.getContent().html(html);
    app.events.trigger('loaderHide');
  },
  renderComment: function (itemComment) {
    console.log(itemComment);
  },
  responseArray: function (item) {
    item.promise().done(function (argOne) {
      console.log('argOne', argOne);
    });
  }
});