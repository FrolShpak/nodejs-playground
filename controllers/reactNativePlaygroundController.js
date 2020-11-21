/* eslint-disable require-jsdoc */
function reactNativePlaygroundController() {
    function signIn(req, res) {
        const { credentials } = req.body;
        if (credentials) {
            res.status(200);
            return res.json({
                name: 'Frol',
                surname: 'Shpak',
            });
        } else {
            res.status(400);
            return res.json('Empty input');
        }
    }

    return { signIn };
}

module.exports = reactNativePlaygroundController;
