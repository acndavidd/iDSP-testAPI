import {Component} from 'angular2/core';
import {VerificationCodeModalComponent} from './modal-includes/verification-code-modal.component';
import {ResendMpinModalComponent} from './modal-includes/resend-mpin-modal.component';
import {Modal} from '../services/modal.service';

@Component({
    selector: 'my-modal',
    templateUrl: 'app/shared/components/modal.component.html',
    directives: [
        VerificationCodeModalComponent,
        ResendMpinModalComponent
    ]
})
export class ModalComponent {

    constructor(private _modalService: Modal.ModalService) {

    }

    getModalState() {
        return this._modalService.getModalState();
    }

    getModalType() {
        return this._modalService.getModalType();
    }

    getModalMessage() {
        return this._modalService.getModalMessage();
    }

    callOKCallBack() {
        if(this.getModalType() === Modal.ModalType.ERROR) {
            this._modalService.toggleModal('');
        }
        let vOKCallBack = this._modalService.getOKCallBack();
        vOKCallBack();
    }

    callCANCELCallBack() {
        let vCANCELCallBack = this._modalService.getCANCELCallBack();
        vCANCELCallBack();
    }

    getModalEnum() {
        return Modal.ModalType;
    }

    getModalStatus() {
        return this._modalService.getModalState();
    }

    getMainModalStatus() {
        return this._modalService.getMainModalState();
    }

}