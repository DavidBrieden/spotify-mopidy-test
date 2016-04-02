var get = function (key, object) {
    return object[key];
};

var handleVolume = function(){
    mopidy.mixer.getVolume().done(function(volume){
        $('#volume').val(volume)
        $('#volumeLabel').text("Volume: " + volume);
    });

    $('#volume').on('input change', function () {
        var volume = $(this).val();
        $('#volumeLabel').text("Volume: " + volume);
        mopidy.mixer.setVolume(parseInt(volume));
    });
};

var queueAndPlay = function (playlistNum, trackNum) {
    
    playlistNum = playlistNum || 0;
    trackNum = trackNum || 0;
    mopidy.playlists.getPlaylists()
        // => list of Playlists
        .fold(get, playlistNum)
        // => Playlist
        .fold(get, 'tracks')
        // => list of Tracks
        .then(mopidy.tracklist.add)
        // => list of TlTracks
        .fold(get, trackNum)
        // => TlTrack
        .then(mopidy.playback.play)
        // => null
        .catch(console.error.bind(console))  // Handle errors here
        // => null
        .done();                       // ...or they'll be thrown here

    handleVolume();
};

var mopidy = new Mopidy({
    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
});

mopidy.on(console.log.bind(console));  // Log all events
mopidy.on("state:online", queueAndPlay);







