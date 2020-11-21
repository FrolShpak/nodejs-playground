const express = require('express');
const reactNativePlaygroundController = require('../controllers/reactNativePlaygroundController');

/**
 * Routers for books
 * @return { Router } Solutions for challenges from https://techdevguide.withgoogle.com */
function routes() {
    const reactNativePlaygroundRouter = express.Router();
    const controller = reactNativePlaygroundController();

    reactNativePlaygroundRouter.route('/signin')
        .post(controller.signIn);

    return reactNativePlaygroundRouter;
}

module.exports = routes;
