var get = function (key, object) {
    return object[key];
};

var initVolume = function(){
    mopidy.mixer.getVolume().done(function(volume){
        $('#volume').val(volume)
        $('#volumeLabel').text("Volume: " + volume);
    });

    $('#volume').on('input change', function () {
        var volume = $(this).val();
        mopidy.mixer.setVolume(parseInt(volume));
    });

    mopidy.on("event:volumeChanged", function(volume){
        volume = volume.volume;
        $('#volumeLabel').text("Volume: " + volume);
    });
};

var initCurrentTrack = function() {
    mopidy.playback.getCurrentTrack().done(function(track){
        $('#currentTrack').text(track.name);
    });
};

var queueAndPlay = function (playlistNum, trackNum) {
    $('#test1').on("click", function(){
        // console.log("Test");
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

    })
    initVolume();
    initCurrentTrack();

    $('#newSong').on('click', function(){
        mopidy.library.lookup("spotify:track:0eGsygTp906u18L0Oimnem").done(function(data){
            if(data.length > 0){
                mopidy.tracklist
                    .add(data)
                    //.clear()
                    //.fold(mopidy.tracklist.add,data)
                    // => list of TlTracks
                    .fold(get, trackNum)
                    // => TlTrack
                    .then(mopidy.playback.play).done();
            }
        });

        var data = mopidy.tracklist.getTracks().done(function(data){
            debugger;
        });
    })
};

var mopidy = new Mopidy({
    webSocketUrl: "ws://192.168.2.107:6680/mopidy/ws/"
});

mopidy.on(console.log.bind(console));  // Log all events
mopidy.on("event:tracklistChanged", function(v1,v2,v3,v4,v5){

});
mopidy.on("state:online", queueAndPlay);







