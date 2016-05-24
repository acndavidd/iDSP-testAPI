import {Component} from 'angular2/core';
import {Modal} from '../../services/modal.service';

@Component({
    selector: 'verification-code-modal',
    templateUrl: 'app/shared/components/modal-includes/verification-code-modal.component.html'
})
export class VerificationCodeModalComponent {

    constructor(private _modalService: Modal.ModalService) {
    }

    close() {
        // this._modalService.toggleVerificationCodeModal();
    }

}