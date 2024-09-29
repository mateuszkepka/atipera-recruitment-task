import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: ``,
        loadComponent: async () => import(`./periodic-table/periodic-table.component`)
    }
];
