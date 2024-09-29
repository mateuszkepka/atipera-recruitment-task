import { Component, computed, effect, input, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OverlayModule } from '@angular/cdk/overlay';
import { PeriodicElement } from '../../interfaces/periodic-element.interface';

@Component({
  selector: `app-periodic-table-value`,
  standalone: true,
  imports: [MatButtonModule, MatIconModule, OverlayModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: `./periodic-table-value.component.html`,
  styleUrl: `./periodic-table-value.component.scss`
})
export class PeriodicTableValueComponent {
  element = input.required<PeriodicElement>();
  config = input.required<{columnName: string, label: string, dataType: string}>();

  isOpen = signal(false);
  value = signal<string | number | undefined>(undefined);

  columnName = computed(() => {
    return this.config().columnName as keyof PeriodicElement;
  });

  currentValue = effect(() => {
    this.value.set(this.element()[this.columnName()])
  }, { allowSignalWrites: true });
}
