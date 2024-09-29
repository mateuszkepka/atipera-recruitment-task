import { InjectionToken } from "@angular/core";
import { PeriodicElement } from "../interfaces/periodic-element.interface";
import { RxState } from '@rx-angular/state';

export interface GlobalState {
    periodicElements: PeriodicElement[];
}

export const GLOBAL_RX_STATE = new InjectionToken<RxState<GlobalState>>(
    `GLOBAL_RX_STATE`
);