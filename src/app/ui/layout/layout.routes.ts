import { Route } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { providePhotosStore } from 'src/app/shared/data-access/photos/photos.store';
import { PaginationStore } from './../../shared/data-access/pagination/pagination.store';
const layoutRoutes: Route[] = [
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        providers: [
          provideComponentStore(PaginationStore),
          providePhotosStore('computer', true),
        ],
        loadComponent: () => import('../photos-grid/photos-grid.component'),
      },
      {
        path: 'random',
        providers: [
          provideComponentStore(PaginationStore),
          providePhotosStore(),
        ],
        loadComponent: () => import('../photos-grid/photos-grid.component'),
      },
    ],
  },
];

export default layoutRoutes;
