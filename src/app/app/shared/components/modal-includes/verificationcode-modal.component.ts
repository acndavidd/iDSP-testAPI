import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'verificationcode-modal',
    templateUrl: 'app/shared/components/modal-includes/verificationcode-modal.component.html'
})
export class VerificationCodeModalComponent {
    
    constructor(private _modalService: ModalService){
    }
    
    close(){
        this._modalService.toggleVerificationCodesModal();
    }
    
}