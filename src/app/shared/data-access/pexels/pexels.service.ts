import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { injectAppConfig } from '../../config/config.di';
import { PhotoPagination } from './pexels.model';

@Injectable({ providedIn: 'root' })
export class PexelsService {
  private readonly httpClient = inject(HttpClient);

  private readonly appConfig = injectAppConfig();

  randomPhotos(page: number = 1): Observable<PhotoPagination> {
    return this.httpClient.get<PhotoPagination>(
      `${this.appConfig.baseUrl}/curated`,
      { params: { per_page: this.appConfig.pexels.pageSize, page } }
    );
  }

  searchPhotos(query: string, page: number = 1): Observable<PhotoPagination> {
    return this.httpClient.get<PhotoPagination>(
      `${this.appConfig.baseUrl}/search`,
      { params: { per_page: this.appConfig.pexels.pageSize, page, query } }
    );
  }
}

export function injectPexelsService() {
  return inject(PexelsService);
}
