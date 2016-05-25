export interface errHandlerInterface {
	getErrorMessage(pErrCode):string
}

export class ErrHandlerService implements errHandlerInterface{
	constructor(){

	}

	getErrorMessage(pErrCode): string
	{
		return "Error Message";
	}
}