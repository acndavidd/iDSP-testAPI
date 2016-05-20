System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AllRetailer;
    return {
        setters:[],
        execute: function() {
            AllRetailer = (function () {
                function AllRetailer(routeID, retailerName, retailerID, accReceivables) {
                    this.routeID = routeID;
                    this.retailerName = retailerName;
                    this.retailerID = retailerID;
                    this.accReceivables = accReceivables;
                }
                return AllRetailer;
            }());
            exports_1("AllRetailer", AllRetailer);
        }
    }
});
//# sourceMappingURL=all-retailer.js.map