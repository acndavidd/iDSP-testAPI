import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class RouteDayOutputModel extends IDSPModel{
	retailerId: string;
	dsp_id: string;
	freq_map_id: number;
	sequence: number;
	route_day_bcp;
	Errors: any;

	constructor(pRetailerID: string, pDspID: string, pFreqMapID: number, pSequence: number) {
		super();
		this.retailerId = pRetailerID;
		this.dsp_id = pDspID;
		this.freq_map_id = pFreqMapID;
		this.sequence = pSequence;
		
		this.route_day_bcp = {
			retailer_id : pRetailerID,
			dsp_id : pDspID,
			freq_map_id : pFreqMapID,
			sequence : pSequence
		}

	}
}