import {Configuration} from '../config/configuration';

declare var CryptoJS: any;

export class EncryptionService {
	constructor() {
	}

	enrypt(pObject: any, pKey: string): string {
		let vCipher = CryptoJS.AES.encrypt(pObject, pKey);
		return vCipher;
	}

	decrypt(pCipher: any, pKey): string {
		let vResult = CryptoJS.AES.decrypt(pCipher.toString(), pKey);
		return vResult.toString(CryptoJS.enc.Utf8);
	}
}