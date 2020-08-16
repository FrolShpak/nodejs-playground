/**
 * BooksController
 * @return { any } functions*/
function googleTechGuideController() {
    /**
     * Routers for books
     * @param { any } req
     * @param { any } res
     * @return { any } result*/
    function challenge01(req, res) {
        const { inputString } = req.body;
        const { inputArray } = req.body;

        const result = inputArray
            .sort((a, b) => {
                return b.length - a.length;
            })
            .find((el) => isSubstring(inputString, el));

        return res.json(result);
    }

    /**
     * Routers for books
     * @param { any } str
     * @param { any } substr
     * @return { any } result*/
    function isSubstring(str, substr) {
        return isSubstringRec(str.split(''), substr.split(''), 0);
    }

    /**
     * Routers for books
     * @param { any } strChars
     * @param { any } substrChars
     * @param { any } startingIndex
     * @return { any } result*/
    function isSubstringRec(strChars, substrChars, startingIndex) {
        let index = strChars.indexOf(substrChars[0]);
        if (index >= startingIndex) {
            substrChars.shift();
            if (substrChars.length > 0) {
                startingIndex = index++;
                return isSubstringRec(strChars, substrChars, startingIndex);
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    return { challenge01 };
}

module.exports = googleTechGuideController;
