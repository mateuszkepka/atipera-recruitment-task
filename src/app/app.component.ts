import { Component, inject } from '@angular/core';

import { GLOBAL_RX_STATE } from './state/state.config';
import { PeriodicElementsService } from './data/periodic-elements.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    state = inject(GLOBAL_RX_STATE);
    periodicElementsService = inject(PeriodicElementsService);
    
    constructor() {
        this.state.connect(
            `periodicElements`,
            this.periodicElementsService.fetchPeriodicElements(),
        );
    }
}
