import {Component} from 'angular2/core';
import {Modal} from '../../services/modal.service';

@Component({
    selector: 'resend-mpin-modal',
    templateUrl: 'app/shared/components/modal-includes/resend-mpin-modal.component.html'
})
export class ResendMpinModalComponent {
    constructor(private _modalService: Modal.ModalService) {
    }
    close() {
        // this._modalService.toggleResendMpinModal();
    }
}