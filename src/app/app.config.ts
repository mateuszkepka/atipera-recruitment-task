import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { GLOBAL_RX_STATE, GlobalState } from './state/state.config';

import { RxState } from '@rx-angular/state';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: GLOBAL_RX_STATE, useFactory: () => new RxState<GlobalState>()
    }
  ]
};
