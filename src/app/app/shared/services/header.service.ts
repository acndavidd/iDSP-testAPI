import {Injectable} from 'angular2/core';

@Injectable()

export class HeaderService{
	vHeaderCaption:string;
	vTitle:string;

	constructor(){}

	setHeaderCaption(pCaption:string){
		this.vHeaderCaption = pCaption;
	}

	getHeaderCaption(){
		return this.vHeaderCaption;
	}
	
	setTitle(pTitle:string){
		this.vTitle = pTitle;
	}

	getTitle(){
		return this.vTitle;
	}
}