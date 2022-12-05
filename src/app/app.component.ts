import {
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet } from '@angular/router';
import { injectAppConfig } from 'src/app/shared/config/config.di';
import { appRoutes } from './app.routes';
import { provideAppConfig } from './shared/config/config.di';
import { AppConfig } from './shared/config/config.modal';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet],
})
export class AppComponent {
  static bootstrap(config: AppConfig) {
    return bootstrapApplication(this, {
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        provideAppConfig(config),
        provideHttpClient(withInterceptors([this.pexelsInterceptor])),
        provideRouter(appRoutes),
      ],
    }).catch((err) => console.error(err));
  }

  private static readonly pexelsInterceptor: HttpInterceptorFn = (
    req,
    next
  ) => {
    const { pexels } = injectAppConfig();

    if (!pexels || !pexels.apiKey) return next(req);
    return next(req.clone({ setHeaders: { Authorization: pexels.apiKey } }));
  };
}
