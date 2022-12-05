import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./ui/layout/layout.component'),
        loadChildren: () => import('./ui/layout/layout.routes'),
    }
]