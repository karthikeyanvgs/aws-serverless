import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { SecurityService } from './app/services/security.service';
import { Configuration } from './app/services/configuration';

if (environment.production) {
  enableProdMode();
}

SecurityService.loadConfig().subscribe(config => {
  if (config) {
    SecurityService.configuration = config;
    console.log("SecurityService.configuration", SecurityService.configuration);
    SecurityService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        platformBrowserDynamic().bootstrapModule(AppModule);
      } else {
        window.location.href = SecurityService.getLoginUrl();
      }
    });
  }
})
