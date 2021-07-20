import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Research } from '../model/research.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResearchConnectorService {
  link = new BehaviorSubject<string | null>('');


  constructor(private httpService: HttpClient) {}

  getAllResearch(): Observable<Research[]> {
    return this.httpService.get<Research[]>('http://localhost:3000/ricerca');
  }

  getResearchByKey(chiave: string): Observable<Research[]> {
    return this.httpService
      .get<Research[]>(
        `http://localhost:3000/ricerca?q=${chiave}&_limit=1&_page=1`,
        { observe: 'response' }
      )
      .pipe(
        map((response) => {
          let resData: any[] = [];
          if (response.body) {
            resData = response.body;
          }

          this.link.next(response.headers.get('Link'));

          return resData;
        })
      );
  }

  getResearchByUrl(url: string) {
    return this.httpService.get<Research[]>(url);
  }

  newResearch(nuovaRicerca: Research) {
    let token;
    token = localStorage.getItem('user');

    if (token != null) {
      token = JSON.parse(token);
      token = token.access_token;
    } else return;

    return this.httpService.post<Research>(
      'http://localhost:3000/ricerca',
      { ...nuovaRicerca },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}
