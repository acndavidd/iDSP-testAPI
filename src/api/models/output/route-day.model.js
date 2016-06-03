"use strict";
const idsp_model_1 = require('../idsp.model');
class RouteDayOutputModel extends idsp_model_1.IDSPModel {
    constructor(pRetailerID, pDspID, pFreqMapID, pSequence) {
        super();
        this.retailerId = pRetailerID;
        this.dsp_id = pDspID;
        this.freq_map_id = pFreqMapID;
        this.sequence = pSequence;
        this.route_day_bcp = {
            retailer_id: pRetailerID,
            dsp_id: pDspID,
            freq_map_id: pFreqMapID,
            sequence: pSequence
        };
    }
}
exports.RouteDayOutputModel = RouteDayOutputModel;
//# sourceMappingURL=route-day.model.js.map