'use strict';
(function(w) {
    var cons = document.getElementById('cons');
    var SWITCH = 1;

    window.onscroll = function() {
        if (!window.starts) {
            return;
        }
        cons.innerHTML += (new Date()) - window.starts + ' ms';
    };
    window.scrollTo(0, 0);

    window.perf.ajax('numbers.json', function(response) {
        window.starts = new Date();

        switch (SWITCH) {
            case 1:
                cons.innerHTML += 'browser sort <br />';
                window.result = response.sort(function(a, b) {
                    var _a = a,
                        _b = b;

                    return _a - _b;
                });
                break;
            case 2:
                cons.innerHTML += 'insertion sort <br />';
                w.sort.insertion(response, w.compare.num);
                w.result = response;
                break;
            case 3:
                cons.innerHTML += 'quick sort <br />';
                w.result = w.sort.quick(response, w.compare.num);
                break;
            case 4:
                cons.innerHTML += 'merge sort <br />';
                window.result = w.sort.merge(response, w.compare.num);
                break;
            default:
                break;
        }

        window.scrollTo(0, 10);
    });
})(window);
