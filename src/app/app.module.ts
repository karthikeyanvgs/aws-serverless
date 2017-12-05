import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import {DndModule} from 'ng2-dnd';

import { HttpInterceptor } from './services/http.interceptor';
import { MoniterService } from './services/moniter.service';
import { DashoardService } from './services/dashboard.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';

import {SharedModule, MultiSelectModule} from 'primeng/primeng';

import { routing } from './app.router';

import { AppComponent } from './app.component';
import { MoniterListComponent } from './pages/moniter-list/moniter-list.component';
import { HeaderComponent } from './component/header/header.component';
import { MoniterDetailComponent } from './pages/moniter-detail/moniter-detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GhxMultiSelectModule } from './component/multiselect/multiselect';
import { GhxDataTableModule } from './component/datatable/datatable';
import { GhxPaginatorModule } from './component/paginator/paginator';

export function createHttpInterceptor (xhrBackend: XHRBackend,
                         requestOptions: RequestOptions,
                         router: Router,
                         authService: AuthService) {
    return new HttpInterceptor(xhrBackend, requestOptions, router, authService);
}
@NgModule({
  declarations: [
    AppComponent,
    MoniterListComponent,
    HeaderComponent,
    MoniterDetailComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    MultiSelectModule,
    GhxMultiSelectModule,
    routing,
    DndModule.forRoot(),
    GhxDataTableModule,
    GhxPaginatorModule
  ],
  exports: [
    DndModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    MoniterService,
    DashoardService,
    {
          provide: Http,
          useFactory: ( createHttpInterceptor ),
          deps: [XHRBackend, RequestOptions, Router, AuthService]
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
