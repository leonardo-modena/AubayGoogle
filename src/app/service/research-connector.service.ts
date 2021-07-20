import {Injectable} from '@angular/core';

import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Research} from '../model/research.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResearchConnectorService {
  headerData = new BehaviorSubject<{ link: string | null, totalCount: string | null }>({link: '', totalCount: ''});


  constructor(private httpService: HttpClient) {
  }

  getAllResearch(): Observable<Research[]> {
    return this.httpService.get<Research[]>('http://localhost:3000/ricerca');
  }

  getResearchByKey(chiave: string, pagina: string): Observable<Research[]> {
    return this.httpService
      .get<Research[]>(
        `http://localhost:3000/ricerca?q=${chiave}&_limit=1&_page=${pagina}`,
        {observe: 'response'}
      )
      .pipe(
        map((response) => {
          let resData: any[] = [];
          if (response.body) {
            resData = response.body;
          }
          this.headerData.next({link: response.headers.get('Link'), totalCount: response.headers.get('X-Total-Count')});

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
      {...nuovaRicerca},
      {headers: {Authorization: `Bearer ${token}`}}
    );
  }
}
