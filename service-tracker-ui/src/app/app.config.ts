import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { demoInterceptor } from './demo.interceptor';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([demoInterceptor])),
    { provide: NZ_I18N, useValue: en_US },
    provideAnimations(),
    provideToastr({
      timeOut: 5000,
      closeButton: true,
      preventDuplicates: false,
      progressBar: true,
    }),
  ],
};
