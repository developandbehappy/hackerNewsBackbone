var app = app || {};
var Backbone = Backbone || {};

app.newsItem = Backbone.View.extend({
  initialize: function () {

  },
  render: function (id) {
    app.events.trigger('loaderShow');
    var self = this;
    self.clearContent();
    $.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json').then(function (response) {
      console.log('response', response);
      self.renderItemData(response);
      self.renderComment(response);
    }, function (error) {
      console.log('error', error);
    });
  },
  clearContent: function () {
    $('.content').html('');
  },
  templateItemComment: function (context) {
    var html = '';
    var self = this;
    context.forEach(function (item) {
      var data = item[0];
//      console.log('data', data);
      var result = app.tpl.postItemComment(data);
      console.log('result', result);
      html = html + result;
    });

    return html;
  },
  renderItemData: function (item) {
    var itemData = app.tpl.postItemTpl(item);
    $('.content').html(itemData);
    return itemData;
  },
  renderListComments(arg) {
    console.log('arg', arg);
    var itemData = this.templateItemComment(arg);
    console.log('itemData', itemData);
    $('.commentsWrapper').append(itemData);
    app.events.trigger('loaderHide');
  },
  renderComment: function (itemNews) {
    var deferredsList = [];
    var self = this;
    console.log('itemNews', itemNews);
    itemNews.kids.map(function (it) {
      var iii = $.get('https://hacker-news.firebaseio.com/v0/item/' + it + '.json');
      deferredsList.push(iii);
    });
    return $.when.apply($, deferredsList).then(function () {
      var args = Array.prototype.slice.call(arguments);
      self.renderListComments(args);
    }, function () {
      console.log('Cant download data from listItems');
      return false;
    });
  }
});