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
            res.status(200);
            return res.json(results[0]);
        } else {
            res.status(400);
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
    function stringSplosion(req, res) {
        const { inputString } = req.body;
        if (inputString && inputString.length > 0) {
            const chars = inputString.split('');
            let index = 0;
            let result = '';
            while (index <= chars.length) {
                result += chars.slice(0, index).join('');
                index++;
            }
            res.status(200);
            return res.send(result);
        } else {
            res.status(400);
            return res.json('Empty input');
        }
    }

    /**
     * Third challenge https://techdevguide.withgoogle.com/paths/foundational/maxspan-problem-return-largest-span-array/#!
     * @param { Request<ParamsDictionary, any, any, qs.ParsedQs> } req
     * @param { Response<any> } res
     * @return { any } result*/
    function maxSpan(req, res) {
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
                res.status(200);
                return res.json(results[0]);
            }
        } else {
            res.status(400);
            return res.json('Empty input');
        }
    }

    /**
     * Fourth challenge https://techdevguide.withgoogle.com/paths/foundational/withoutstring-problem-strings-base-remove-return/#!
     * @param { Request<ParamsDictionary, any, any, qs.ParsedQs> } req
     * @param { Response<any> } res
     * @return { any } result*/
    function withoutString(req, res) {
        let { inputString1, inputString2 } = req.body;
        if (inputString1 && inputString1.length > 0 &&
        inputString2 && inputString2.length > 0) {
            while (inputString1.indexOf(inputString2) > 0) {
                inputString1 = inputString1.replace(inputString2, '');
            }
            return res.send(inputString1);
        } else {
            res.status(400);
            return res.json('Empty input');
        }
    }

    /**
     * Fifth challenge https://techdevguide.withgoogle.com/paths/foundational/subnumbers-problem-string-return-sum/#!
     * @param { Request<ParamsDictionary, any, any, qs.ParsedQs> } req
     * @param { Response<any> } res
     * @return { any } result*/
    function sumNumbers(req, res) {
        const { inputString } = req.body;
        if (inputString && inputString.length > 0) {
            const inputStringChars = inputString.split('');
            let result = 0;
            for (let i = 0; i < inputStringChars.length; i++) {
                if (!isNaN(inputStringChars[i])) {
                    const num = getNumber(inputStringChars, i);
                    result += +num;
                    i += num.length - 1;
                }
            }
            res.status(200);
            return res.json(result);
        } else {
            res.status(400);
            return res.json('Empty input');
        }
    }

    /**
     * @param { string[] } inputStringChars
     * @param { number } index
     * @return { string } result*/
    function getNumber(inputStringChars, index) {
        let result = inputStringChars[index];
        index++;
        while (!isNaN(inputStringChars[index]) &&
        inputStringChars[index] != ' ') {
            result += inputStringChars[index];
            index++;
        }
        return result;
    }

    return { challenge01, stringSplosion, maxSpan, withoutString, sumNumbers };
}

module.exports = googleTechGuideController;
