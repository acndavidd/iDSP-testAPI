import {Injectable} from 'angular2/core';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';

@Injectable()
export class LayoutService {

	currentPage: string;
    numberSelection = false;

	layoutState = {
		appHeader: false,
        appFooter: false
	};
    
    footerItem = {
        start: true,
        call: true,
        end: true,
        setting: true
    };

    footerState = {
        mytransaction: false,
        basicp :false,
        closeday : false,
        settings :false
    }

	/*
	constructor (private _http: Http,
    private _pageNavigationService: PageNavigationService,
    private _matchMediaService: MatchMediaService) { 
        const url = 'config/layout.json';        
        this._http.get(
            url,        
            <RequestOptionsArgs>{        
                headers: new Headers({        
                    'Content-Type': 'application/x-www-form-urlencoded',        
                })        
            }).subscribe(file => {        
                let layout = file.json();
                console.log(layout);  
            });
        }
	*/
	getCurrentPage(){
		return this.currentPage;
	}
    
    getFooterState(){
        return this.footerState;
    }

    getFooterLayout(){
        return this.footerItem;
    }
	
	getLayout(){
		return this.layoutState;
	}
    
    setNumberSelectionState(){
        this.numberSelection = !this.numberSelection;
    }
    
    getNumberSelectionState(){
        return this.numberSelection;
    }

    getfooterItem(){
        return this.footerItem;
    }

    setCurrentPage(current : string)
    {
        this.currentPage = current;
        
      if(current == 'GetStarted' ||
        current == 'Verification' ||
        current == 'Login'){
        
            this.layoutState = {
                appHeader: false,
                appFooter: false
            };
        }
       else if(current=='MyTransaction')
        {
            this.layoutState = {
              appHeader: true,
              appFooter: true
            };
            this.footerState = 
            {
               mytransaction : true,
               basicp : false,
               closeday : false,
               settings : false
            };    
        }
          else if(current=='BasicCallProcedure')
          {
              this.layoutState = {
                  appHeader: true,
                  appFooter: true
              };
               this.footerState = 
               {
                   mytransaction : false,
                   basicp : true,
                   closeday : false,
                   settings : false
               };    
          }
           else if(current=='CloseDay')
          {
              this.layoutState = {
                  appHeader: true,
                  appFooter: true
              };
               this.footerState = 
               {
                   mytransaction : false,
                   basicp : false,
                   closeday : true,
                   settings : false
               };    
          }
           else if(current=='Settings')
          {
               this.layoutState = {
                   appHeader: true,
                   appFooter: true
               };
              this.footerState = 
              {
                  mytransaction : false,
                  basicp : false,
                  closeday : false,
                  settings : true
              };        
           }
        else if(current=='DetailRetailer')
        {
            this._pageNavigationService.setPreviousPage('BasicCallProcedure');
            
            this.layoutState = {
              appHeader: true,
              appFooter: true
            };
            this.footerState = 
            {
                mytransaction : false,
                basicp : true,
                closeday : false,
                settings : false
            };    
            this.headerItem = {
                back: true,
                filter: false,
                edit: false
            }
        }
    }
}
