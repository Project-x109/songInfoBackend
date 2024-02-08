const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
    },
    artist: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    album: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    genre: {
        type: String,
        trim: true,
        maxlength: 50,
    },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
