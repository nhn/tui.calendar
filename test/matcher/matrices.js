/**
 * @fileoverview jasmine custom matcher for test
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var matricesMatcher = (function() {
    function pickTitle(matrix) {
        var titleList = [],
            i, cnt;

        for (i = 0, cnt = matrix.length; i < cnt; i += 1) {
            titleList.push(matrix[i].valueOf().title);
        }

        return titleList;
    }


    function fail(msg) {
        return {
            message: msg,
            pass: false
        };
    }

    function matcher(actual, expected) {
        var i, j, cnt, cnt2,
            aMatrix, aLength, bMatrix, bLength,
            aColumn, bColumn, aModel, bTitle,
            result = {
                message: '매트릭스 일치',
                pass: true
            };

        if (actual.length !== expected.length) {
            return fail('매트릭스 갯수 불일치\n' +
                        'actual: ' + actual + '\n' +
                        'expected: ' + expected);
        }

        for (i = 0, cnt = actual.length; i < cnt; i += 1) {
            aMatrix = actual[i];
            aLength = aMatrix.length;
            bMatrix = expected[i];
            bLength = bMatrix.length;

            if (aLength !== bLength) {
                return fail(i + ' 번째 매트릭스 다름\n' + 
                            'actual: ' + pickTitle(aMatrix) + '\n' +
                            'expected: ' + bMatrix);
            }

            for (j = 0, cnt2 = aMatrix.length; j < cnt2; j += 1) {
                aColumn = aMatrix[j];

                if (!aColumn) {
                    continue;
                }

                aModel = aColumn.valueOf();
                bTitle = bMatrix[j];
                
                if (aModel.title !== bTitle) {
                    return fail('[' + i + '][' + j + '] 번째 매트릭스 다름\n' +
                                'actual: ' + aModel.title + '\n' +
                                'expected: ' + bTitle);
                }
            }
        }

        return result;
    }

    return {
        toEqualMatrices: function(util, customEqualityTesters) {
            return {
                compare: matcher
            };
        }
    };
});

