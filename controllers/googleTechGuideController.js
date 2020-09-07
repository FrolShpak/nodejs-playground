/**
 * Google challenges controller
 * @return { any } functions, one per each challenge*/
function googleTechGuideController() {
    /**
     * First challenge https://techdevguide.withgoogle.com/paths/foundational/find-longest-word-in-dictionary-that-subsequence-of-given-string#!
     * @param { Request<ParamsDictionary, any, any, qs.ParsedQs> } req
     * @param { Response<any> } res
     * @return { any } result*/
    function challenge01(req, res) {
        const { inputString } = req.body;
        const { inputArray } = req.body;
        const grouped = [];
        const results = [];

        if (inputString && inputString.length > 0 &&
        inputArray && inputArray.length > 0 ) {
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
            results.sort((a, b) => {
                return b.length - a.length;
            });
            // Older solution
            // const result = inputArray
            //     .sort((a, b) => {
            //         return b.length - a.length;
            //     })
            //     .find((el) => isSubstring(inputString, el));
            return res.json(results[0]);
        } else {
            res.status(404);
            return res.json('Empty input');
        }
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

    /**
     * Second challenge https://techdevguide.withgoogle.com/paths/foundational/stringsplosion-problem-ccocodcode/#!
     * @param { Request<ParamsDictionary, any, any, qs.ParsedQs> } req
     * @param { Response<any> } res
     * @return { any } result*/
    function challenge02(req, res) {
        const { inputString } = req.body;
        if (inputString && inputString.length > 0) {
            const chars = inputString.split('');
            let index = 0;
            let result = '';
            while (index <= chars.length) {
                result += chars.slice(0, index).join('');
                index++;
            }
            return res.send(result);
        } else {
            res.status(404);
            return res.json('Empty input');
        }
    }

    /**
     * Second challenge https://techdevguide.withgoogle.com/paths/foundational/maxspan-problem-return-largest-span-array/#!
     * @param { Request<ParamsDictionary, any, any, qs.ParsedQs> } req
     * @param { Response<any> } res
     * @return { any } result*/
    function challenge03(req, res) {
        const { inputArray } = req.body;
        if (inputArray && inputArray.length !== 0) {
            if (inputArray.length === 1) {
                return res.send(1);
            } else {
                const results = [];
                inputArray.forEach((elm) => {
                    let tuple = results.find((r) => r.value === elm);
                    if (!tuple) {
                        tuple = {
                            value: elm,
                            spanArray: [],
                            span: 0,
                        };

                        const firstInst = inputArray.indexOf(elm);
                        const lastInst = inputArray.lastIndexOf(elm);
                        const spanArray = inputArray.slice(firstInst, lastInst+1);

                        tuple.spanArray = spanArray;
                        tuple.span = spanArray.length;

                        results.push(tuple);
                    }
                });
                results.sort((a, b) => {
                    return b.span - a.span;
                });
                return res.json(results[0]);
            }
        } else {
            res.status(404);
            return res.json('Empty input');
        }
    }

    return { challenge01, challenge02, challenge03 };
}

module.exports = googleTechGuideController;
