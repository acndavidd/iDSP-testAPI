"use strict";
var Utility;
(function (Utility) {
    function sortJSON(pJSONObject, pSortKey, pASC) {
        let vAsc = pASC ? pASC : true; //default is Ascending
        return pJSONObject.sort(function (a, b) {
            if (typeof a[pSortKey] === 'number') {
                return vAsc ? a[pSortKey] - b[pSortKey] : b[pSortKey] - a[pSortKey];
            }
        });
    }
    Utility.sortJSON = sortJSON;
})(Utility = exports.Utility || (exports.Utility = {}));
//# sourceMappingURL=utility.js.map