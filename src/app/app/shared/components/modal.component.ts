import {Component} from 'angular2/core';
import {VerificationCodeModalComponent} from './modal-includes/verification-code-modal.component';
import {ResendMpinModalComponent} from './modal-includes/resend-mpin-modal.component';
import {Modal} from '../services/modal.service';
import {LayoutService} from '../services/layout.service';
import {Router} from 'angular2/router';

@Component({
    selector: 'my-modal',
    templateUrl: 'app/shared/components/modal.component.html'
})

export class ModalComponent {

    constructor(private _modalService: Modal.ModalService) {
    }

    getModalState() {
        return this._modalService.getModalState();
    }

    getButtons() {
        return this._modalService.getButtons();
    }

    getModalMessage() {
        return this._modalService.getModalMessage();
    }

    getFootNote() {
        return this._modalService.getFootNote();
    }

    callback(pButton: Modal.ModalButton) {
        pButton.callback(pButton.callbackParams);
        this._modalService.closeModal();
    }

    /*
    getModalState() {
        return this._modalService.getModalState();
    }

    getModalType() {
        return this._modalService.getModalType();
    }

    getFootNote() {
        return this._modalService.getFootNote();
    }

    getButtons() {
        return this._modalService.getButtons();
    }

    callBack(button) {
        button.callback(button.param);
    }
    */
}