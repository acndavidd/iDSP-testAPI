import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {Modal} from '../../shared/services/modal.service';
import {NgModel} from 'angular2/common';

@Component({
    templateUrl: './app/basic-call-procedure/components/confirm-collection.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class ConfirmCollectionComponent {

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _retailerService: RetailerService,
        private _pageNavigationService: PageNavigationService,
        private _router: Router,
        private _modalService: Modal.ModalService
        ) {


        this._layoutService.setCurrentPage('ConfirmCollection');
        this._headerService.setTitle('Confirm Collection');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    gotoOffers() {
        this._pageNavigationService.navigate('Offer', null, null);
    }

    skipCollection() {

            console.log('Skip Collection');
            let params = {
            _pageNavigationService : this._pageNavigationService
            };

            this._modalService.toggleModal('Are you sure  <br/> you want to skip collection ?', 
            Modal.ModalType.CONFIRMATION, 
            {footNote : '* If you confirm to continue, <br/> You cannot go back to collection for this retailer', 
            ModalButton : Modal.ModalButton.OK_CANCEL, 
            callback : this.skipCollectionback, 
            param : params,
            } );
    }

    skipCollectionback(pParam) {

            pParam._pageNavigationService.navigate('SkipCollection', null, null);

    } 
              
}