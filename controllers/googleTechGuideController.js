/**
 * Google challenges controller
 * @return { any } functions, one per each challenge*/
function googleTechGuideController() {
    /**
     * First challenge https://techdevguide.withgoogle.com/paths/foundational/find-longest-word-in-dictionary-that-subsequence-of-given-string#!
     * @param { any } req
     * @param { any } res
     * @return { any } result*/
    function challenge01(req, res) {
        const { inputString } = req.body;
        const { inputArray } = req.body;
        const grouped = [];
        const results = [];

        inputArray.forEach((el) => {
            grouped.push({
                letter: el[0],
                tuple: { word: el, index: 0 },
            });
        });
        inputString.split('').forEach((ch) => {
            grouped.forEach((g) => {
                if (g.letter === ch) {
                    g.tuple.index++;
                    if (g.tuple.index === g.tuple.word.length) {
                        g.letter = undefined;
                        results.push(g.tuple.word);
                    } else {
                        g.letter = g.tuple.word[g.tuple.index];
                    }
                }
            });
        });
        console.log(results);
        results.sort((a, b) => {
            return b.length - a.length;
        });
        console.log(results);

        // Older solution
        // const result = inputArray
        //     .sort((a, b) => {
        //         return b.length - a.length;
        //     })
        //     .find((el) => isSubstring(inputString, el));

        return res.json(results[0]);
    }

    /**
     * Method that will call recursive one after prepering input
     * @param { any } str
     * @param { any } substr
     * @return { any } result*/
    // function isSubstring(str, substr) {
    //     return isSubstringRec(str.split(''), substr.split(''), 0);
    // }

    // /**
    //  * Recursive method for finding if one string is substring of another
    //  * @param { any } strChars
    //  * @param { any } substrChars
    //  * @param { any } startingIndex
    //  * @return { any } result*/
    // function isSubstringRec(strChars, substrChars, startingIndex) {
    //     let index = strChars.indexOf(substrChars[0]);
    //     if (index >= startingIndex) {
    //         substrChars.shift();
    //         if (substrChars.length > 0) {
    //             startingIndex = index++;
    //             return isSubstringRec(strChars, substrChars, startingIndex);
    //         } else {
    //             return true;
    //         }
    //     } else {
    //         return false;
    //     }
    // }

    return { challenge01 };
}

module.exports = googleTechGuideController;
