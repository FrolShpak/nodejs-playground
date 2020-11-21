const express = require('express');
const multer = require('multer');
const gifExtractorController = require('../controllers/gifExtractorController');

/**
 * Routers for books
 * @return { Router } Solutions for challenges from https://techdevguide.withgoogle.com */
function routes() {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(
                null,
                '/Users/frolshpak/Documents/projects/nodejs/nodejs-playground/uploads',
            );
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now());
        },
    });

    const upload = multer({ storage: storage });
    const gifExtractorRouter = express.Router();
    const controller = gifExtractorController();

    gifExtractorRouter
        .route('/extractGif')
        .post(upload.single('video'), controller.extractGif);

    return gifExtractorRouter;
}

module.exports = routes;
