import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import Material from '@primeng/themes/material';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
	SocialAuthServiceConfig,
	FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimations(),
		provideHttpClient(),
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				providers: [
					{
						id: FacebookLoginProvider.PROVIDER_ID,
						provider: new FacebookLoginProvider('1336955447356626', {
							scope: 'email,public_profile',
						}),
					},
				],
			} as SocialAuthServiceConfig,
		},
		provideAnimationsAsync(),
		providePrimeNG({
			theme: {
				preset: Nora,
				options: {
					prefix: 'p',
					darkModeSelector: 'null',
					cssLayer: {
						name: 'primeng',
						order: 'theme, base, primeng',
					},
          colors: {
          },
				},
			},
		}),
	],
};
