var app = app || {};
var Backbone = Backbone || {};

$(function () {
  app.router = new app.Router();
  Backbone.history.start();
});
