import {validate, isValid} from 'class-validator';

export class IDSPModel {
	Errors:any;

	validate() {
		if(!isValid(this)) {
			this.Errors = validate(this);
		}
		return isValid(this);
	}
}