import {Injectable} from 'angular2/core';

@Injectable()

export class HeaderService{
	private title:string;
	constructor(){}

	setTitle(title:string){
		this.title = title;
	}

	getTitle(){
		return this.title;
	}
}