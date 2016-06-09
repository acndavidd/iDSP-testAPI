import { Injectable } from 'angular2/core';
import {Router} from 'angular2/router';

export const PASSCODESTEP = {
    SET : 0, // set the passcode
    CONFIRM : 1, // confirm the passcode
    INPUT : 2 // input passcode to decrypt
}

export const PASSCODETITLE = ['Set Passcode Lock', 'Confirm Passcode Lock', 'Enter Passcode Lock'];
export const DISPLAY_MESSAGE = ['Please enter a passcode', 'Please re-enter passcode', 'Please enter your passcode'];

@Injectable()
export class PasscodeService {

    private vPassCodeShow: boolean;
    private vPasscodeStep: number;

    constructor(_router: Router) {
    	this.resetState();
    }

    resetState() {
    	this.vPassCodeShow = false;
    	this.vPasscodeStep = PASSCODESTEP.SET;
    }

    showPasscode() {
    	this.vPassCodeShow = true;
    }

    hidePasscode() {
    	this.vPassCodeShow = false;
    }

    getStep() {
    	return this.vPasscodeStep;
    }

    setStep(pStep: number) {
    	this.vPasscodeStep = pStep;
    }

    getPasscodeState() {
    	return this.vPassCodeShow;
    }

    getPasscodeTitle() {
    	return PASSCODETITLE[this.vPasscodeStep];
    }

    getDisplayMessage() {
    	return DISPLAY_MESSAGE[this.vPasscodeStep];
    }

}