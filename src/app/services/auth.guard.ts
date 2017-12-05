import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { ActivatedRoute } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private route: ActivatedRoute) {

    }
    canActivate() {
        if (window.location.hash.indexOf('access_token') >= 0) {
            let urlHash = window.location.hash.substr(1, window.location.hash.length);
            let urlParams = urlHash.replace(new RegExp('&', 'g'), '","');
            urlParams = urlParams.replace(new RegExp('=', 'g'), '":"');
            urlParams = JSON.parse('{"' + urlParams + '"}');
            localStorage.setItem('access_token', urlParams['access_token'])
        }

        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.authService.logout();
            return false;
        }
    }
}