var app = app || {};
var Backbone = Backbone || {};

app.userView = Backbone.View.extend({
  initialize: function () {

  },
  render: function (userId) {
    var self = this;
    this.clearContent();
    $.get('https://hacker-news.firebaseio.com/v0/user/' + userId + '.json').then(function (response) {
      self.renderUserData(response);
      self.fetchSubmitted(response);
    }, function (error) {
      console.log('error', error);
    });
  },
  renderUserData: function (userContext) {
    userContext.sizeSubmitted = userContext.submitted.length - 1;
    var itemData = app.tpl.userData(userContext);
    $('.content').html(itemData);
    app.events.trigger('loaderHide');
    return itemData;
  },
  clearContent: function () {
    $('.content').html('');
  },
  fetchSubmitted: function (userSubmitted) {
    var deferredsList = [];
    var self = this;
    userSubmitted.submitted.map(function (it) {
      var iii = $.get('https://hacker-news.firebaseio.com/v0/item/' + it + '.json');
      deferredsList.push(iii);
    });
    return $.when.apply($, deferredsList).then(function () {
      var args = Array.prototype.slice.call(arguments);
      self.renderListSubmitted(args);
    }, function () {
      console.log('Cant download data from listItems');
      return false;
    });
  },
  renderListSubmitted(arg) {
    console.log('arg', arg);
    var itemData = this.templateUserSubmittedData(arg);
    console.log('itemData', itemData);
    $('.navTabs').append(itemData);
    app.events.trigger('loaderHide');
  },
  templateUserSubmittedData: function (context) {
    var html = '';
    var self = this;
    context.forEach(function (item) {
      var data = item[0];
      console.log('data', data);
      var result = app.tpl.userComments(data);
      console.log('result', result);
      html = html + result;
    });
    return html;
  }
});