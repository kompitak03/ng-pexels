import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LetModule, PushModule } from '@ngrx/component';
import { injectDefaultQuery } from 'src/app/shared/data-access/photos/photos.store';
import { PaginatorComponent } from '../paginator/paginator.component';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { SearchComponent } from '../search/search.component';
import { injectPhotosStore } from './../../shared/data-access/photos/photos.store';

@Component({
  selector: 'app-photos-grid',
  standalone: true,
  template: `
    <app-paginator></app-paginator>
    <ng-container *ngrxLet="photosStore.vm$ as vm">
      <app-search
        *ngIf="vm.withSearch"
        [defaultQuery]="vm.query"
        (query)="photosStore.setQuery($event)"
      ></app-search>
      <div class="photos-grid">
        <app-photo-card
          *ngFor="let photo of vm.photos"
          [photo]="photo"
        ></app-photo-card>
      </div>
    </ng-container>
  `,
  styleUrls: ['./photos-grid.component.scss'],
  imports: [
    PaginatorComponent,
    SearchComponent,
    NgIf,
    PhotoCardComponent,
    NgFor,
    PushModule,
    LetModule,
  ],
})
export default class PhotosGridComponent {
  @Input() withSearch = false;
  readonly defaultQuery = injectDefaultQuery();
  readonly photosStore = injectPhotosStore();
}
