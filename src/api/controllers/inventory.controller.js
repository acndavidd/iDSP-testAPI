'use strict';
class InventoryController {
    constructor() {
    }
    getProductListPhysical(pRequest, pResponse) {
        console.log("masukk sini pak");
        var vResult;
        try {
            vResult = {
                status: "SUCCESS",
                statusMessage: "BERHASIL BERHASIL HORE",
                productList: [{
                        productID: "10001",
                        productName: "SKU1",
                        beginningBalance: "500",
                        newDelivery: "100",
                        sold: "100",
                        transferBack: "100",
                        endingBalance: "500",
                        dateModified: "20160429003012"
                    }, {
                        productID: "10002",
                        productName: "SKU2",
                        beginningBalance: "700",
                        newDelivery: "100",
                        sold: "100",
                        transferBack: "100",
                        endingBalance: "700",
                        dateModified: "20160429003012"
                    }]
            };
        }
        catch (err) {
            vResult = {
                status: "ERROR",
                statusMessage: "GAGAL BRO",
                productList: {}
            };
        }
        pResponse.json(vResult);
    }
}
exports.InventoryController = InventoryController;
//# sourceMappingURL=inventory.controller.js.map