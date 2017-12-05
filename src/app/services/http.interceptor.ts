import {
    Http,
    Request,
    RequestOptionsArgs,
    Response,
    RequestOptions,
    ConnectionBackend,
    Headers
} from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

import { environment } from '../../environments/environment';
import { SecurityService } from './security.service';
declare var jQuery: any;

@Injectable()
export class HttpInterceptor extends Http {

    constructor(backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private router: Router, private authService: AuthService) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.get(url, this.getRequestOptionArgs(url, options)));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(url, options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(url, options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.delete(url, this.getRequestOptionArgs(url, options)));
    }
    updateUrl(url: string) {
        if(url.indexOf('http') < 0){
            url = SecurityService.configuration.serviceBaseUrl + '/' + url;
        }        
        console.log('url', url);
        return url;
    }
    getRequestOptionArgs(url: string, options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  localStorage.getItem('access_token')
            });
        }
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((error, source) => {
            console.log('error.status', error.status)
            if (error.status === 403 || error.status === 401 || error.status === 0) {
                this.authService.logout();
            }         
            return Observable.throw(error);
        });
    }

    private hideModel() {
        if (jQuery('div.modal').hasClass('in')) {
            jQuery('div.modal').trigger('click');
        }
    }
}
