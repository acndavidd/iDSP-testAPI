import {Component} from 'angular2/core';
import {Modal} from '../../services/modal.service';

@Component({
    selector: 'skip-sales-order-modal',
    templateUrl: 'app/shared/components/modal-includes/skip-sales-order-modal.component.html'
})
export class SkipSalesOrderModalComponent {
    constructor(private _modalService: Modal.ModalService) {
    }
    close() {
        // this._modalService.toggleSkipSalesOrderModal();
    }
}