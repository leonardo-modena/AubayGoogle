import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Research} from '../model/research.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResearchConnectorService {
  constructor(
    private httpService: HttpClient,
  ) {
  }

  research(chiave: string): Observable<Research[]> {
    return this.httpService.get<Research[]>(
      `http://localhost:3000/ricerca?q=${chiave}&_limit=1&_page=1`
    ).pipe(map((response) => {
      console.log(response);
      response.forEach((item: any) => {
        if (item.nuovaRicerca) {
          item["titolo"] = item.nuovaRicerca.titolo;
          item["descrizione"] = item.nuovaRicerca.descrizione;
          item["chiavi"] = item.nuovaRicerca.chiavi;
          item["url"] = item.nuovaRicerca.url;
        }
      })
      return response;
    }));
  }

  newResearch(nuovaRicerca: Research) {
    let token;
    token = localStorage.getItem("user")

    if (token != null) {
      token = JSON.parse(token)
      token = token.access_token;
      console.log(token)
    } else
      return;

    return this.httpService
      .post<Research>(
        'http://localhost:3000/ricerca',
        {nuovaRicerca},
        {headers: {Authorization: `Bearer ${token}`}}
      );
  }
}
