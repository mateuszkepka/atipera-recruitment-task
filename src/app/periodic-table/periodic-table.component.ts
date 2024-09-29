import { BehaviorSubject, Observable, combineLatest, debounceTime, map, startWith } from 'rxjs';
import { Component, inject, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';

import { AsyncPipe } from '@angular/common';
import { GLOBAL_RX_STATE } from '../state/state.config';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../interfaces/periodic-element.interface';
import { PeriodicTableValueComponent } from './periodic-table-value/periodic-table-value.component';
import { rxState } from '@rx-angular/state';

export interface PeriodicTableState {
    periodicElements: PeriodicElement[];
    searchValue: string;
}

@Component({
  selector: `app-periodic-table`,
  standalone: true,
  imports: [MatTableModule, PeriodicTableValueComponent, AsyncPipe, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: `./periodic-table.component.html`,
  styleUrl: `./periodic-table.component.scss`,
})
export default class PeriodicTableComponent {
    filterInput = viewChild(MatInput);

    globalState = inject(GLOBAL_RX_STATE);
    displayedColumns: string[] = [`position`, `name`, `weight`, `symbol`];

    searchSubject = new BehaviorSubject<string>(``);

    searchValue = new FormControl<string>(``);
    
    state = rxState<PeriodicTableState>(({ set, connect }) => {
        set({ periodicElements: [] });
        connect(`periodicElements`, this.globalState.select(`periodicElements`));
        connect(`searchValue`, this.searchValue.valueChanges.pipe(debounceTime(2000)) as Observable<any>);
    });

    filteredElements = this.state.computed(({ periodicElements, searchValue }) => {
        if (!searchValue()) {
            return periodicElements();
        }

        return periodicElements().filter((element) => {
            const values = Object.values(element);
            return values.some((value) => {
                if (typeof value === `number`) {
                    return value.toString().includes(searchValue());
                }

                return value.toLowerCase().includes(searchValue().toLowerCase());
            })
        })
    });

    tableConfig = [
        {
            columnName: `position`,
            label: `Number`,
            dataType: `number`,
        },
        {
            columnName: `name`,
            label: `Name`,
            dataType: `text`,
        },
        {
            columnName: `weight`,
            label: `Weight`,
            dataType: `number`,
        },
        {
            columnName: `symbol`,
            label: `Symbol`,
            dataType: `text`,
        },
    ];

    constructor() {
        this.globalState.connect(
            `periodicElements`,
            this.globalState.select(`periodicElements`)
        );
    }
}
