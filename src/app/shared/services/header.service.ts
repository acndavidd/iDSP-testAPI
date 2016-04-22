import {Injectable} from 'angular2/core';

@Injectable()

export class HeaderService{
	headerCaption:string;

	constructor(){}

	setHeaderCaption(caption:string){
		this.headerCaption = caption;
	}

	getHeaderCaption(){
		return this.headerCaption;
	}
}