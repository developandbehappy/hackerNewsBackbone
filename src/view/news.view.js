var app = app || {};
var Backbone = Backbone || {};

app.newsView = Backbone.View.extend({
  el: 'body',
  events: {
    'click #moreLoadData': 'moreLoadData'
  },
  initialize: function () {
    this.defaultLimit = 3;
    this.offset = 0;
  },
  render: function () {
    var self = this;
    this.data = [];
    $.when($.ajax("https://hacker-news.firebaseio.com/v0/topstories.json")).then(function (items) {
      self.data = items;
      return self.getPromiseArray(0, self.defaultLimit, items);
    }, function (error) {
      console.log('Cant get data error ' + error);
      return false;
    }).then(function (responseItemsList) {
      if (!responseItemsList) {
        alert('Did not download data please reload a page');
        return false;
      }
      self.renderList(responseItemsList);
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
  getListDataHtml: function (arrListData) {
    var html = '';
    var self = this;
    arrListData.forEach(function (item) {
      var data = item[0];
      html = html + self.templateListData(data);
    });
    return html;
  },
  moreLoadData: function () {
    var self = this;
    console.log('this.data', this.data);
    if (this.btnIsDisabled()) {
      return false;
    }
    this.disableBtn();
    this.getPromiseArray(this.offset, this.defaultLimit, this.data).then(function (responseItemsList) {
      if (!responseItemsList) {
        alert('Did not download data please reload a page');
        return false;
      }
      self.renderListItems(responseItemsList);
      console.log('last_response', responseItemsList);
    });
  },
  disableBtn: function () {
    $('#moreLoadData').addClass('disabled');
    app.events.trigger('loaderShow');
  },
  enableBtn: function () {
    $('#moreLoadData').removeClass('disabled');
    app.events.trigger('loaderHide');
  },
  btnIsDisabled: function () {
    return $('#moreLoadData').hasClass('disabled');
  },
  template: function (context) {
    var source = $("#postListTpl").html();
    var template = Handlebars.compile(source);
    return template(context);
  },
  renderList: function (responseItemsList) {
    var html = this.template({count: this.defaultLimit});
    $('.content').html(html);
    this.renderListItems(responseItemsList);
  },
  renderListItems: function (responseItemsList) {
    var html = this.getListDataHtml(responseItemsList);
    $('.listPost').append(html);
    this.enableBtn();
  }
});