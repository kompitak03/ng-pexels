import { inject, Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  provideComponentStore,
} from '@ngrx/component-store';
import {
  catchError,
  defer,
  EMPTY,
  pipe,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { createInjectionToken } from '../../utils/di';
import { injectPageginationStore } from '../pagination/pagination.store';
import { Photo } from '../pexels/pexels.model';
import { injectPexelsService } from '../pexels/pexels.service';

export const [injectDefaultQuery, provideDefaultQuery] =
  createInjectionToken<string>('Default Query');

export const [injectWithSearch, provideWithSearch] =
  createInjectionToken<boolean>('With Search');

@Injectable()
export class PhotosStore
  extends ComponentStore<{
    photos: Photo[];
    query: string;
    withSearch: boolean;
  }>
  implements OnStoreInit, OnStateInit
{
  private readonly pexelsService = injectPexelsService();

  private readonly paginationStore = injectPageginationStore();

  private readonly defaultQuery = injectDefaultQuery();

  private readonly withSearch = injectWithSearch();

  private readonly photos$ = this.select((s) => s.photos);

  private readonly query$ = this.select((s) => s.query);

  readonly vm$ = this.select(
    {
      photos: this.photos$,
      query: this.query$,
      withSearch: this.select((s) => s.withSearch),
    },
    { debounce: true }
  );

  private readonly getPhotos = this.effect<{ query: string; page: number }>(
    pipe(
      switchMap(({ query, page }) => {
        return defer(() =>
          query
            ? this.pexelsService.searchPhotos(query, page)
            : this.pexelsService.randomPhotos(page)
        ).pipe(
          tap((response) => {
            this.paginationStore.setTotal(response.total_results);
            this.patchState({ photos: response.photos });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  readonly setQuery = this.effect<string>(
    pipe(
      withLatestFrom(this.query$),
      tap(([query, previousQuery]) => {
        if (previousQuery && !query) {
          this.paginationStore.setPage(1);
        }
        this.patchState({ query });
      })
    )
  );

  ngrxOnStoreInit() {
    this.setState({
      photos: [],
      query: this.defaultQuery,
      withSearch: this.withSearch,
    });
  }

  ngrxOnStateInit() {
    this.getPhotos(
      this.select(
        {
          page: this.paginationStore.currentPage$,
          query: this.query$,
        },
        { debounce: true }
      )
    );
  }
}

export function providePhotosStore(defaultQuery = '', withSearch = false) {
  return [
    provideComponentStore(PhotosStore),
    provideDefaultQuery(defaultQuery),
    provideWithSearch(withSearch)
  ];
}

export function injectPhotosStore() {
  return inject(PhotosStore);
}
