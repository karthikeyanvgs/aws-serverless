import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Configuration } from './configuration';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class SecurityService {
    // isAuthenticated = false;
    isAuthenticated: boolean = true;
    ssoEnabled: boolean = true;
    rootContext: string = '/';
    redirectUrl: string = '';
    userStatus: any = null;
    static configuration: Configuration;

    static setRedirectUrl(url) {
        localStorage.setItem('redirect', url);
    }

    static getRedirectUrl() {
        return localStorage.getItem('redirect');
    }
    static loadConfig(): Observable<any> | any {
        var configObserver: Observable<Configuration>;
        configObserver = new Observable(observer => {
            let req = new XMLHttpRequest();
            req.open('GET', 'configuration');
            req.setRequestHeader("Content-type", "application/json");
            req.onload = function () {
                if (req.status == 200) {
                    observer.next(JSON.parse(req.response));
                } else {
                    observer.next(req.statusText)
                }
            }
            req.onerror = function () {
                observer.next("Network Error");
            };
            req.send();
        });
        return configObserver;
    }
    static isLoggedIn(): Observable<any> | any {
        this.checkAndSetTokens();
        return new Observable(observer => {
            let accessToken = localStorage.getItem('access_token');
            if (accessToken === null) {
                observer.next(false)
            } else {
                observer.next(true)
            }
        });

    }
    static checkAndSetTokens() {
        if (window.location.hash.indexOf('access_token') >= 0) {
            let urlHash = window.location.hash.substr(1, window.location.hash.length);
            let urlParams = urlHash.replace(new RegExp('&', 'g'), '","');
            urlParams = urlParams.replace(new RegExp('=', 'g'), '":"');
            urlParams = JSON.parse('{"' + urlParams + '"}');
            localStorage.setItem('access_token', urlParams['access_token']);
            localStorage.setItem('id_token', urlParams['id_token']);
        }
    }
    static getLoginUrl() {
        let loginUrl = SecurityService.configuration.identityServiceUrl + '/authorize?response_type=id_token+token&client_id='
            + SecurityService.configuration.clientId +
            '&scope=' + SecurityService.configuration.clientScope + '&redirect_uri='
            + SecurityService.configuration.idpRedirectUri
        return loginUrl;
    }

    getLogoutUrl() {
        let idToken = localStorage.getItem('id_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        let logoutUrl = SecurityService.configuration.identityServiceUrl + '/end_session_endpoint?id_token_hint=' + idToken
            + '&logout_type=' + SecurityService.configuration.logoutType + '&post_logout_redirect_uri=' + SecurityService.configuration.idpRedirectUri;
        if (idToken === null || idToken === '') {
            logoutUrl = SecurityService.getLoginUrl();
        }
        return logoutUrl;
    }
}
