const express = require('express');
const googleTechGuideController = require('../controllers/googleTechGuideController');

/**
 * Routers for books
 * @return { Router } Solutions for challenges from https://techdevguide.withgoogle.com */
function routes() {
    const googleTechGuideRouter = express.Router();
    const controller = googleTechGuideController();

    googleTechGuideRouter.route('/challenges')
        .get((req, res) => {
            res.status(200);
            return res.send('Check');
        });

    googleTechGuideRouter
        .route('/challenges/find-longest-word-in-dictionary-that-subsequence-of-given-string')
        .get((req, res)=> {
            res.status(200);
            return res.send(`Given a string S and a set of words D, find the longest word in D that is a subsequence of S.
            Word W is a subsequence of S if some number of characters, possibly zero, can be deleted from S to form W, without reordering the remaining characters.
            Example payload for post:
            {
                "inputString": "abppplee",
                "inputArray" : [ 
                    "able", 
                    "ale", 
                    "apple", 
                    "bale", 
                    "kangaroo"
                ]
            }`);
        })
        .post(controller.challenge01);

    return googleTechGuideRouter;
}

module.exports = routes;
