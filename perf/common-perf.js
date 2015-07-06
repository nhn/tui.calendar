'use strict';

(function() {
    function ajax(url, callback) {
        var xhr;
        if (ne.util.isExisty(ne.util.pick(window, 'XMLHttpRequest'))) {
            xhr = new XMLHttpRequest();
        } else if (ne.util.isExisty(ne.util.pick(window, 'ActiveXObject'))) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP'); // jshint ignore:line
        } else {
            return false;
        }

        xhr.open('get', url, true);
        xhr.setRequestHeader('type', 'application/json; charset=utf-8');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            var status;

            if (xhr.readyState === 4) {
                status = xhr.status;

                if ((status >= 200 && status < 300) || status === 304) {
                    callback(JSON.parse(xhr.responseText));
                }
            }
        };

        xhr.send(null);
    }

    window.perf = {
        ajax: ajax
    };
})();
