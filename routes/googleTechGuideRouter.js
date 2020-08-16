const express = require('express');
const googleTechGuideController = require('../controllers/googleTechGuideController');

function routes(){
    const googleTechGuideRouter = express.Router();
    const controller = googleTechGuideController();

    googleTechGuideRouter.route('/challenges')
        .get((req, res) => {
            res.status(201);
            return res.send('Check');
        });

    googleTechGuideRouter.route('/challenges/find-longest-word-in-dictionary-that-subsequence-of-given-string')
        .get((req, res)=> {
            res.status(201);
            return res.send('Check');
        })
        .post(controller.challenge01);

    return googleTechGuideRouter;
}

module.exports = routes;
