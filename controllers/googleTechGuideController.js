function googleTechGuideController(){
    function challenge01(req, res) {
        const { inputString } = req.body;
        const { inputArray } = req.body;
        
        const result = inputArray
            .sort((a, b) => {
                return b.length - a.length;
            })
            .find(el => isSubstring(inputString, el));

        return res.json(result);
    }

    function isSubstring(str, substr){
        return isSubstringRec(str.split(''), substr.split(''), 0);
    }

    function isSubstringRec(strChars, substrChars, startingIndex){
        let index = strChars.indexOf(substrChars[0]);
        if (index >= startingIndex) {
            substrChars.shift();
            if (substrChars.length > 0) {
                startingIndex = index++;
                return isSubstringRec(strChars, substrChars, startingIndex);
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }

    return {challenge01};
}

module.exports = googleTechGuideController;
