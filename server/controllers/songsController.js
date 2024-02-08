const express = require("express");
const Song = require("../models/Songs");
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const asyncErrorHandler = require("../middlewares/asyncErrorHandler")
exports.addNewSong = asyncErrorHandler(async (req, res) => {
    const { title, artist, album, genre } = req.body;
    console.log(req.body)
    const error = []
    try {
        const newSong = new Song({
            title,
            artist,
            album,
            genre,
        });
        await newSong.save()
        res.status(201).json({ success: true, message: "song added successfully", song: newSong });;
    } catch (err) {
        error.push("Internal Server Error")
        res.status(500).json({ success: false, error: error });
    }
})

exports.getAllSongs = asyncErrorHandler(async (req, res) => {
    const error = []
    try {
        const songs = await Song.find()
        res.status(200).json({ success: true, message: "All Songs Successfully fetched", song: songs });
    } catch (err) {
        error.push("Internal Server Error")
        res.status(500).json({ success: false, error: error });
    }
})

exports.updateSong = asyncErrorHandler(async (req, res) => {
    const error = []
    try {
        const { id } = req.params;
        const { title, artist, album, genre } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            error.push('Invalid Song ID')
            return res.status(400).json({ success: false, errors: error });
        }
        const song = await Song.findById(id);
        if (!song) {
            error.push('Song not found')
            return res.status(404).json({ success: false, errors: error });
        }
        song.title = title || song.title;
        song.artist = artist || song.artist;
        song.album = album || song.album;
        song.genre = genre || song.genre;
        await song.save();
        res.status(200).json({ success: true, message: 'Song updated successfully', song: song });
    } catch (err) {
        error.push("Internal Server Error")
        res.status(500).json({ success: false, errors: error });
    }
});

exports.deleteSong = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const error = []
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            error.push('Invalid Song ID')
            return res.status(400).json({ success: false, errors: error });
        }
        const song = await Song.findOneAndDelete(id);
        if (!song) {
            error.push('Song not found')
            return res.status(404).json({ success: false, errors: error });
        }
        res.status(200).json({ success: true, message: "Song  deleted successfully", song: song })
    } catch (err) {
        error.push("Internal Server Error")
        res.status(500).json({ success: false, errors: error });
    }
})

exports.getAllSongsByFilter = asyncErrorHandler(async (req, res) => {
    const error = [];
    try {
        let filter = {};
        if (req.query.artist) {
            filter.artist = req.query.artist;
        }
        if (req.query.album) {
            filter.album = req.query.album;
        }
        if (req.query.title) {
            filter.title = req.query.title;
        }
        if (req.query.genre) {
            filter.genre = req.query.genre;
        }

        const songs = await Song.find(filter);
        res.status(200).json({ success: true, data: songs });
    } catch (err) {
        error.push("Internal Server Error");
        res.status(500).json({ success: false, error: error });
    }
});

exports.getSongsCountByGenre = asyncErrorHandler(async (req, res) => {
    const error = [];
    try {
        const genreCounts = await Song.aggregate([
            { $group: { _id: "$genre", count: { $sum: 1 } } }
        ]);
        res.status(200).json({ success: true, data: genreCounts });
    } catch (err) {
        error.push("Internal Server Error");
        res.status(500).json({ success: false, errors: error });
    }
});
exports.getStatistics = async (req, res) => {
    try {
        const artistCount = await Song.aggregate([
            { $group: { _id: "$artist" } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]).then(result => (result.length > 0 ? result[0].count : 0));

        const albumCount = await Song.aggregate([
            { $group: { _id: "$album" } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]).then(result => (result.length > 0 ? result[0].count : 0));

        const genreCount = await Song.aggregate([
            { $group: { _id: "$genre" } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]).then(result => (result.length > 0 ? result[0].count : 0));

        res.status(200).json({
            success: true,
            data: {
                artistCount,
                albumCount,
                genreCount
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, errors: ["Internal Server Error"] });
    }
}


exports.getMostPopularArtist = asyncErrorHandler(async (req, res) => {
    const error = [];
    try {
        const popularArtist = await Song.aggregate([
            { $group: { _id: "$artist", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        res.status(200).json({ success: true, data: popularArtist });
    } catch (err) {
        error.push("Internal Server Error");
        res.status(500).json({ success: false, errors: error });
    }
});


