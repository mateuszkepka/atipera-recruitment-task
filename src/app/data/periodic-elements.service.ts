import { ELEMENT_DATA } from "./periodic-elements.data";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
    providedIn: `root`,
})
export class PeriodicElementsService {
    fetchPeriodicElements() {
        return of(ELEMENT_DATA);
    }
}
