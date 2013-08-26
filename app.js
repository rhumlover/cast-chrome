var receiver = new cast.receiver.Receiver
(
    '358a5251-4f55-4e2d-9276-62da9b153a22_2',
    [cast.receiver.RemoteMedia.NAMESPACE, 'DM']/*,
    "",
    5*/
);

var remoteMedia = new cast.receiver.RemoteMedia(),
    channel = receiver.createChannelFactory(cast.receiver.RemoteMedia.NAMESPACE);

remoteMedia.addChannelFactory(channel);

var dmHandler = new cast.receiver.RemoteMedia();
dmHandler.addChannelFactory(receiver.createChannelFactory('DM'));

receiver.start();

window.addEventListener('load', function()
{
    var player = document.getElementById('player');

    remoteMedia.setMediaElement(player);

    player.addEventListener('loadedmetadata', function()
    {
        console.log
        (
            cast.receiver.RemoteMedia.getTitle,
            cast.receiver.RemoteMedia.getImageURL,
            cast.receiver.RemoteMedia.getContentInfo
        );
    })

    player.addEventListener('ended', function()
    {
        setTimeout(function()
        {
            console.log('display inactivity message');
        }, 5000);
    });
});