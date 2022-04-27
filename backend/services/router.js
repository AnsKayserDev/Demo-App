const express = require('express');
const router = express.Router();

const movieController = require('./controller/movieController');

router.route('/getMovieList').get(movieController.getList);
router.route('/getGenreList').get(movieController.getGenreList);

module.exports = router;
