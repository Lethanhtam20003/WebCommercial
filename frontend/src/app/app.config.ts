import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
	SocialAuthServiceConfig,
	FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import {
	HTTP_INTERCEPTORS,
	HttpClient,
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimationsAsync(),
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				// providers: [
				//   {
				//     id: FacebookLoginProvider.PROVIDER_ID,
				//     provider: new FacebookLoginProvider(environment.facebookAppId, {
				//       scope: 'email,public_profile',
				//     }),
				//   },
				// ],
			} as SocialAuthServiceConfig,
		},
		provideHttpClient(withInterceptorsFromDi()),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		importProvidersFrom(
			TranslateModule.forRoot({
				defaultLanguage: 'vi',
				loader: {
					provide: TranslateLoader,
					useFactory: HttpLoaderFactory,
					deps: [HttpClient],
				},
			})
		),
	],
};
