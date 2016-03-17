(function () {
    /**
    * @function SongPlayer
    * @desc Constructs the SongPlayer object
    * @returns {Object}
    */
    function SongPlayer(Fixtures) {
        /**
        * @desc The instantiated SongPlayer object
        * @type {Object}
        */
        var SongPlayer = {};

        /**
        * @desc The currently loaded album
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

        /**
        * @function getSongIndex
        * @desc Returns the index of the current song in the album object's song array
        * @param {Object} song
        * @returns {Number}
        */
        var getSongIndex = function getSongIndex(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function setSong(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };

        /**
        * @function playSong
        * @desc Starts or resumes playback of the currentBuzzObject audio file
        * @param {Object} song
        */
        var playSong = function playSong(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
        * @desc The currently selected song
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @function play
        * @desc Assigns and plays a new audio file or resumes playback of the curent one
        * @param {Object} song
        */
        SongPlayer.play = function play(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
        @function pause
        @desc Pauses playback of the current audio file
        */
        SongPlayer.pause = function pause(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @function previous
        * @desc Skips to previous song and begins playback
                If first song is playing, stops playback
        */
        SongPlayer.previous = function previous() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function next
        * @desc Skips to next song and begins playback
                If last song is playing, stops playback
        */
        SongPlayer.next = function next() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > currentAlbum.songs.length - 1) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
