const express = require('express');
const { addNewSong, getAllSongs, updateSong, deleteSong, getStatistics, getSongsCountByGenre, getAllSongsByFilter, getMostPopularArtist } = require('../controllers/songsController')
const router = express.Router()
const { validateCreateSong, handleValidationErrors } = require("../middlewares/validation")
router.route('/songs').post(validateCreateSong, handleValidationErrors, addNewSong)
router.route('/songs').get(getAllSongs)
router.route('/get-songs-count-by-genre').get(getSongsCountByGenre)
router.route('/get-statistics').get(getStatistics)
router.route('/get-popular-artist').get(getMostPopularArtist)
router.route('/songs/:id').put(validateCreateSong, handleValidationErrors, updateSong)
router.route('/songs/:id').delete(deleteSong)
router.route('/songsbyFilter').get(getAllSongsByFilter)

module.exports = router;