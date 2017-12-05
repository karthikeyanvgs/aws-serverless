import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable()

export class AuthService {
    constructor() { }

    isLoggedIn(): boolean {
        let access_token = localStorage.getItem('access_token');
        if (access_token) {
            return true;
        }
        else {
            return false;
        }
    }
    logout() {
        let redirectUrl = environment.identityServiceUrl + '?response_type=id_token+token&client_id='
                + environment.client_id +
                '&scope=openid+profile+product_roles+roles&nonce=30cab238a6261&state=9ce53b0fcfec&redirect_uri='
                + environment.idpRedirectUri;
        let token = localStorage.getItem('access_token');
        if (token !== null) {
            redirectUrl = redirectUrl + '&prompt=none';
        }
        window.location.href = redirectUrl;
    }
}