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
            return res.send('Alive');
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

    googleTechGuideRouter
        .route('/challenges/stringSplosion')
        .get((req, res)=> {
            res.status(200);
            return res.send(`Given a non-empty string like "Code" return a string like "CCoCodCode".

            stringSplosion("Code") → "CCoCodCode"
            stringSplosion("abc") → "aababc"
            stringSplosion("ab") → "aab"
            Example payload for post:
            {
                "inputString": "Code"
            }`);
        })
        .post(controller.stringSplosion);

    googleTechGuideRouter
        .route('/challenges/maxSpan')
        .get((req, res)=> {
            res.status(200);
            return res.send(`Consider the leftmost and righmost appearances of some value in an array. We'll say that the "span" is the number of elements between the two inclusive. A single value has a span of 1. Returns the largest span found in the given array. (Efficiency is not a priority.)
            
            maxSpan([1, 2, 1, 1, 3]) → 4
            maxSpan([1, 4, 2, 1, 4, 1, 4]) → 6
            maxSpan([1, 4, 2, 1, 4, 4, 4]) → 6
            Example payload for post:
            {
                "inputArray": [
                    1,
                    2,
                    1,
                    1,
                    3
                ]
            }`);
        })
        .post(controller.maxSpan);

    googleTechGuideRouter
        .route('/challenges/withoutString')
        .get((req, res)=> {
            res.status(200);
            return res.send(`Given two strings, base and remove, return a version of the base string where all instances of the remove string have been removed (not case sensitive). You may assume that the remove string is length 1 or more. Remove only non-overlapping instances, so with "xxx" removing "xx" leaves "x".

            withoutString("Hello there", "llo") → "He there"
            withoutString("Hello there", "e") → "Hllo thr"
            withoutString("Hello there", "x") → "Hello there"
            Example payload for post:
            {
                "inputStrin1": "Hello there",
                "inputString2": "llo"
            }`);
        })
        .post(controller.withoutString);

    return googleTechGuideRouter;
}

module.exports = routes;
