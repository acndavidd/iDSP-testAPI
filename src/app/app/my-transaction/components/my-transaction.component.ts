import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';

@Component({
    templateUrl: './app/my-transaction/components/my-transaction.component.html',
	directives: [
		NgModel,
		ROUTER_DIRECTIVES
    ]
})


export class MyTransactionComponent {
	

	constructor (
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService,
		private _router: Router
    	) 
	{

		this._layoutService.setCurrentPage('MyTransaction');
		this._headerService.setTitle("MY TRANSACTION");
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }

	goToTargetsActuals(){
		console.log('PEGI KE TARGET ACTUAL');
		this._router.navigate(['TargetsActuals']);
	}
	
	goToInventory(){
		console.log('PEGI KE INVENTORY');
		this._router.navigate(['Inventory']);
	}
	
	goToRetailerRoute(){
		console.log('PEGI KE RETAILER ROUTE');
		this._router.navigate(['RetailerRoute']);
	}
	
	goToAccountsReceivables(){
		console.log('PEGI KE Account');
		this._router.navigate(['AccountsReceivables']);
	}
	
	goToDSPAlerts(){
		console.log('PEGI KE DSP');
		this._router.navigate(['DSPAlerts']);
	}
}