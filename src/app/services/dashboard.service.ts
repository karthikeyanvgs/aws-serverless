import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class DashoardService {
  private moniterListUrl = 'admin/flowstatus'; // assets/mock/dashboard.json
  
  constructor(private router: Router, private http: Http) {
  }

  getDashboard(datatableParams: any = {}): Observable<any> {
        return this.http.post(this.moniterListUrl,datatableParams)
        .map(response => {
            return response.json();
            }).catch(() => {
            return Observable.of(false);
        });
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
