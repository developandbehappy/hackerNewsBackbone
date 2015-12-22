var app = app || {};
var Backbone = Backbone || {};

app.tpl = {
  postListTpl: function (context) {
    var source = $("#postListTpl").html();
    var template = Handlebars.compile(source);
    return template(context);
  },
  postListItemTpl: function (context) {
    var source = $("#postListItemTpl").html();
    var template = Handlebars.compile(source);
    return template(context);
  },
  postItemTpl: function (context) {
    var source = $("#postItemTpl").html();
    var template = Handlebars.compile(source);
    return template(context);
  },
  postItemComment: function (context) {
    var source = $("#postItemComment").html();
    var template = Handlebars.compile(source);
    return template(context);
  },
  userData: function (context) {
    var source = $("#userData").html();
    var template = Handlebars.compile(source);
    return template(context);
  },
  userComments: function (context) {
    var source = $("#userComments").html();
    var template = Handlebars.compile(source);
    return template(context);
  },
  userSubmitted: function (context) {
    var source = $("#userSubmitted").html();
    var template = Handlebars.compile(source);
    return template(context);
  },
};