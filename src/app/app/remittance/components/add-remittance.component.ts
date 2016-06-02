import {HeaderService} from '../../shared/services/header.service';
import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';



@Component({
    templateUrl: './app/remittance/components/add-remittance.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class AddRemittanceComponent {
    
    vSelectedRemittance;
    vDatePicker;
    vDateTimePicker;

    constructor (
    private _router: Router,
    private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService,
    private _headerService: HeaderService,
    private _pageNavigationService: PageNavigationService
    ) {
        this._layoutService.setCurrentPage('AddRemittance');
        this._headerService.setTitle('Add Remittance');

        this.vSelectedRemittance = 'Cash';
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    gotoRemittance() {
        this._pageNavigationService.navigate('Remittance', null, null);
    }


    aaa() {
        console.log('aaaa');
        var options = {
            date: new Date(),
            mode: 'date'
        };

        this.vDatePicker.show(options, function(date) {
            alert('date result ' + date);  
        });
    }

    bbb() {
        console.log('bbbb');
        var onDateSelected = function (date) {
            console.log(new Date(parseInt(date, 10)));
        };

        this.vDateTimePicker.selectDate(onDateSelected);
    }
}