// Generated by CoffeeScript 1.6.3
(function() {
  'use strict';
  var DMCast, cast;

  cast = window.cast || {};

  DMCast = (function() {
    DMCast.prototype.APPID = '358a5251-4f55-4e2d-9276-62da9b153a22_2';

    DMCast.prototype.PROTOCOL = 'com.dailymotion.Dailymotion';

    function DMCast() {
      var castEvents;
      castEvents = cast.receiver.Channel.EventType;
      this.mChannelHandler = new cast.receiver.ChannelHandler('dmdebug');
      this.mChannelHandler.addEventListener(castEvents.MESSAGE, this.onMessage.bind(this));
      this.mChannelHandler.addEventListener(castEvents.OPEN, this.onChannelOpened.bind(this));
      this.mChannelHandler.addEventListener(castEvents.CLOSED, this.onChannelClosed.bind(this));
    }

    DMCast.prototype.onChannelOpened = function(event) {
      console.log('onChannelOpened. Total number of channels: ' + this.mChannelHandler.getChannels().length);
    };

    DMCast.prototype.onChannelClosed = function(event) {
      console.log('onChannelClosed. Total number of channels: ' + this.mChannelHandler.getChannels().length);
      if (this.mChannelHandler.getChannels().length === 0) {
        window.close();
      }
    };

    DMCast.prototype.onMessage = function(event) {
      var channel, message;
      message = event.message;
      channel = event.target;
      console.log('********onMessage********' + JSON.stringify(message));
    };

    return DMCast;

  })();

  window.addEventListener('load', function() {
    var app, player, receiver;
    player = document.querySelector('.player');
    receiver = new cast.receiver.Receiver(DMCast.APPID, [DMCast.PROTOCOL], '', 5);
    app = new DMCast();
    app.mChannelHandler.addChannelFactory(receiver.createChannelFactory(DMCast.PROTOCOL));
    receiver.start();
  });

}).call(this);
