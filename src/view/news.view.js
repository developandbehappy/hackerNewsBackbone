var app = app || {};
var Backbone = Backbone || {};

app.newsView = Backbone.View.extend({
  el: 'body',
  initialize: function () {

  },
  render: function () {
    var self = this;
    var res = '';
    this.data = [];
    $.when($.ajax("https://hacker-news.firebaseio.com/v0/topstories.json")).then(function (items) {
      return self.getPromiseArray(0, 10, items);
    }, function (error) {
      console.log('Cant get data error ' + error);
      return false;
    }).then(function (responseItemsList) {
      if (!responseItemsList) {
        alert('Did not download data please reload a page');
        return false;
      }
      self.renderListData(responseItemsList);
      console.log('last_response', responseItemsList);
    });
  },
  templateListData: function (context) {
    var source = $("#postListItemTpl").html();
    var template = Handlebars.compile(source);
    return template(context);
  },
  getPromiseArray: function (offset, limit, list) {
    var listSize = list.length;
    console.log('listSize', listSize);
    if (offset >= listSize) {
      return false;
    }
    var arrayOfPromise = [];
    for (var i = offset; i <= offset + limit; i++) {
      console.log('add item id:', i);
      var item = list[i];
      var promiseItem = $.get('https://hacker-news.firebaseio.com/v0/item/' + item + '.json');
      arrayOfPromise.push(promiseItem);
    }
    return $.when.apply($, arrayOfPromise).then(function () {
      return Array.prototype.slice.call(arguments);
    }, function () {
      console.log('Cant download data from listItems');
      return false;
    });
  },
  renderListData: function (arrListData) {
    var html = '';
    var self = this;
    arrListData.forEach(function (item) {
      var data = item[0];
      html = self.templateListData(data);
      $('.listPost').append(html);
    });
  }
});