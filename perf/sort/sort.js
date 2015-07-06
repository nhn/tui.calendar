'use strict';

(function(w) {
    /**********
     * Insertion Sort
     **********/

    function insertionSort(arr, compare) {
        var len = arr.length,
            i,
            j,
            item;

        if (len < 2) {
            return arr;
        }

        for (i = 1; i < len; i += 1) {
            item = arr[i];
            j = i - 1;

            for (; j >= 0 && compare(item, arr[j]) < 0; j -= 1) {
                arr[j + 1] = arr[j];
            }
            arr[j + 1] = item;
        }
    }

    /**********
     * Quick Sort
     **********/

    function quickSort(arr, compare) {
        var len = arr.length,
            left,
            right,
            pivot,
            i;

        if (len < 2) {
            return arr;
        }

        left = [];
        right = [];
        pivot = arr[0];

        for (i = 1; i < len; i += 1) {
            if (compare(arr[i], pivot) < 0) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return quickSort(left, compare).concat(pivot, quickSort(right, compare));
    }

    /**********
     * Merge Sort
     **********/

    function merge(left, right, compare) {
        var result = [],
            lenLeft = left.length,
            lenRight = right.length,
            indexLeft = 0,
            indexRight = 0;

        while (indexLeft < lenLeft && indexRight < lenRight) {
            if (compare(left[indexLeft], right[indexRight]) < 0) {
                result.push(left[indexLeft]);
                indexLeft += 1;
            } else {
                result.push(right[indexRight]);
                indexRight += 1;
            }
        }

        return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
    }

    function mergeSort(arr, compare) {
        var len = arr.length,
            middle,
            left,
            right,
            params;

        if (len < 2) {
            return arr;
        }

        middle = len / 2 | 0;
        left = arr.slice(0, middle);
        right = arr.slice(middle);
        params = merge(mergeSort(left, compare), mergeSort(right, compare), compare);

        params.unshift(0, len);
        arr.splice.apply(arr, params);
        return arr;
    }

    w.sort = {
        insertion: insertionSort,
        quick: quickSort,
        merge: mergeSort
    };
})(window);

