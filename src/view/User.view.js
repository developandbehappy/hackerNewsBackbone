var app = app || {};
var Backbone = Backbone || {};

app.userView = Backbone.View.extend({
  initialize: function () {

  },
  render: function (userId) {
    app.events.trigger('loaderShow');
    var self = this;
    this.clearContent();
    $.get('https://hacker-news.firebaseio.com/v0/user/' + userId + '.json').then(function (response) {
      self.renderUserData(response);
      self.fetchSubmitted(response).then(function (response) {
        self.renderStoryList(response);
        self.renderCommentsList(response);
      });
    }, function (error) {
      console.log('error', error);
    });
  },
  renderUserData: function (userContext) {
    var itemData = app.tpl.userData(userContext);
    console.log('userContext', userContext);
    $('.content').html(itemData);
  },
  clearContent: function () {
    $('.content').html('');
  },
  fetchSubmitted: function (data) {
    var deferredsList = [];
    var self = this;
    data.submitted.map(function (it) {
      var iii = $.get('https://hacker-news.firebaseio.com/v0/item/' + it + '.json');
      deferredsList.push(iii);
    });
    return $.when.apply($, deferredsList).then(function () {
      var args = Array.prototype.slice.call(arguments);
      return args.map(function (item) {
        return item[0];
      });
    }, function () {
      console.log('Cant download data from listItems');
      return false;
    });
  },
  renderStoryList: function(list) {
    var html = '';
    list.filter(function (item) {
      return item.type === 'story';
    }).forEach(function (item) {
      html += app.tpl.userSubmitted(item);
    });
    $('#userStoryList').append(html);
    app.events.trigger('loaderHide');
  },
  renderCommentsList: function(list) {
    var html = '';
    list.filter(function (item) {
      return item.type === 'comment';
    }).forEach(function (item) {
      html += app.tpl.userComments(item);
    });
    $('#userCommentsList').append(html);
    app.events.trigger('loaderHide');
  },
//  renderListCommented(arg) {
//    var itemData = this.templateUserCommentedData(arg);
//    $('#comments').append(itemData);
//    app.events.trigger('loaderHide');
//  },
//  templateUserSubmittedData: function (context) {
//    var html = '';
//    var self = this;
//    context.forEach(function (item) {
//      var data = item[0];
//      data.submitted = data.title;
//      var result = app.tpl.userComments(data);
//      console.log('result', result);
//      html = html + result;
//    });
//    return html;
//  }
});
