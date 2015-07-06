'use strict';
(function(w) {
    var cons = document.getElementById('cons');
    var SWITCH = 3;

    w.onscroll = function() {
        if (!w.starts) {
            return;
        }
        cons.innerHTML += (new Date()) - w.starts + ' ms';
    };
    w.scrollTo(0, 0);

    w.perf.ajax('numbers2.json', function(response) {
        w.starts = new Date();

        function compare(_a, _b) {
            var a = _a,
                b = _b;

            if (a.f > b.f) {
                return 1;
            } else if (a.f < b.f) {
                return -1;
            } else if (a.s > b.s) {
                return 1;
            } else if (a.s < b.s) {
                return -1;
            } else {
                return 0;
            }
        }

        switch (SWITCH) {
            case 1:
                cons.innerHTML += 'browser sort <br />';
                w.result = response.sort(compare);
                break;
            case 2:
                cons.innerHTML += 'insertion sort <br />';
                w.sort.insertion(response, compare);
                w.result = response;
                break;
            case 3:
                cons.innerHTML += 'quick sort <br />';
                w.result = w.sort.quick(response, compare);
                break;
            case 4:
                cons.innerHTML += 'merge sort <br />';
                w.result = w.sort.merge(response, compare);
                break;
            case 5:
                cons.innerHTML += 'heap sort<br />';
                w.result = w.sort.heap(response, compare);
            default:
                break;
        }

        w.scrollTo(0, 10);
    });
})(window);
