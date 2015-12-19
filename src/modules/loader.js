var app = app || {};
var Backbone = Backbone || {};

app.loader = {
  init: function () {
    var self = this;
    app.events.on('loaderShow', function () {
      self.show();
    });
    app.events.on('loaderHide', function () {
      self.hide();
    });
  },
  show: function () {
    this.getLoadingWrapper().show();
  },
  hide: function () {
    this.getLoadingWrapper().hide();
  },
  getLoadingWrapper: function () {
    return $('#loadingWrapper');
  }
};

