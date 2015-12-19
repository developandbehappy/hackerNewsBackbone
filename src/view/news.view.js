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
    $.when($.ajax("https://hacker-news.firebaseio.com/v0/topstories.json")).then(function (item) {
      self.data = item;
      self.data.forEach(function (item, i, arr) {
        $.get('https://hacker-news.firebaseio.com/v0/item/' + item + '.json', function (item) {
          console.log('obj', item);
          res = self.templateListData({title: item.title, link: item.url});
          $('.listPost').append(res);
        });
      });
    }, function (error) {
      console.log('Cant get data error ' + error);
      return false;
    });



  },
  templateListData: function (context) {
    var source = $("#postListItemTpl").html();
    var template = Handlebars.compile(source);
    return template(context);
  }
})
;
