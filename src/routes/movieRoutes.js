const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieControllers");

router.get("/", movieController.getMovies);

module.exports = router;
