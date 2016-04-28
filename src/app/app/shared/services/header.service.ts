import {Injectable} from 'angular2/core';

@Injectable()

export class HeaderService{
	headerCaption:string;
	title:string;

	constructor(){}

	setHeaderCaption(caption:string){
		this.headerCaption = caption;
	}

	getHeaderCaption(){
		return this.headerCaption;
	}
	
	setTitle(title:string){
		this.title = title;
	}

	getTitle(){
		return this.title;
	}
}