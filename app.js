// Generated by CoffeeScript 1.6.3
(function() {
  'use strict';
  var DM, cast, dmHandler, receiver, remoteMedia;

  cast = window.cast || {};

  DM = {
    appId: '358a5251-4f55-4e2d-9276-62da9b153a22_2',
    namespaces: {
      "default": cast.receiver.RemoteMedia.NAMESPACE,
      dm: 'com.dailymotion.Dailymotion'
    }
  };

  receiver = new cast.receiver.Receiver(DM.appId, [DM.namespaces["default"], DM.namespaces.dm]);

  remoteMedia = new cast.receiver.RemoteMedia();

  remoteMedia.addChannelFactory(receiver.createChannelFactory(namespaces["default"]));

  dmHandler = new cast.receiver.RemoteMedia();

  dmHandler.addChannelFactory(receiver.createChannelFactory(namespaces.dm));

  receiver.start();

  window.addEventListener('load', function() {
    var player;
    player = document.querySelector('.player');
    remoteMedia.setMediaElement(player);
    player.addEventListener('loadedmetadata', function() {
      console.log.apply(null, [cast.receiver.RemoteMedia.getTitle, cast.receiver.RemoteMedia.getImageURL, cast.receiver.RemoteMedia.getContentInfo]);
    });
    player.addEventListener('ended', function() {
      setTimeout(function() {
        console.log('display inactivity message');
      }, 5000);
    });
  });

}).call(this);
