'use strict';

(function(w) {
    function numCompare(_a, _b) {
        var a = +_a,
            b = +_b;

        return a - b;
    }

    function strCompare(_a, _b) {
        var a = (_a + '').toLowerCase(),
            b = (_b + '').toLowerCase();

        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    }

    w.compare = {
        num: numCompare,
        str: strCompare
    };
})(window);
