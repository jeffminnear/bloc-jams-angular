(function () {
    /**
    * @function SongPlayer
    * @desc Constructs the SongPlayer object
    * @returns {Object}
    */
    function SongPlayer() {
        /**
        * @desc The instantiated SongPlayer object
        * @type {Object}
        */
        var SongPlayer = {};

        /**
        * @desc The currently selected song
        * @type {Object}
        */
        var currentSong = null;

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
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
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
        * @function play
        * @desc Assigns and plays a new audio file or resumes playback of the curent one
        * @param {Object} song
        */
        SongPlayer.play = function play(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
