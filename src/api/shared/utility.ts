export module Utility {
	export function sortJSON(pJSONObject: Object, pSortKey: string, pASC?: boolean) {
		let vAsc: boolean = pASC ? pASC : true; //default is Ascending
		return pJSONObject.sort(function(a,b){
			if(typeof a[pSortKey] === 'number') {
				return vAsc ? a[pSortKey] - b[pSortKey] : b[pSortKey] - a[pSortKey];
			}
		});
	}
}