var app = app || {};
var Backbone = Backbone || {};

app.newsView = Backbone.View.extend({
  el: 'body',
  events: {
    'click #moreLoadData': 'moreLoadData'
  },
  initialize: function () {
    this.offset = 0;
  },
  render: function () {
    var self = this;
    this.data = [];
    $.when($.ajax("https://hacker-news.firebaseio.com/v0/topstories.json")).then(function (items) {
      self.data = items;
      return self.getPromiseArray(0, 3, items);
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
    var self = this;
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
      self.offset = offset + 1 + limit;
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
  },
  moreLoadData: function () {
    var self = this;
    console.log('this.data', this.data);
    this.getPromiseArray(this.offset, 3, this.data).then(function (responseItemsList) {
      if (!responseItemsList) {
        alert('Did not download data please reload a page');
        return false;
      }
      self.renderListData(responseItemsList);
      console.log('last_response', responseItemsList);
    });
  }
});