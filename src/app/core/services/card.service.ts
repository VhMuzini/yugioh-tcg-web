import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Card, CardListResponse, CardSearchParams } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class CardService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/cards`;

  search(params: CardSearchParams): Observable<CardListResponse> {
    let httpParams = new HttpParams();

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return this.http.get<CardListResponse>(this.baseUrl, { params: httpParams });
  }

  getById(id: string | number): Observable<Card> {
    return this.http.get<Card>(`${this.baseUrl}/${id}`);
  }
}
