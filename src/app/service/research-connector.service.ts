import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Research} from "../model/research.model";

@Injectable({
  providedIn: 'root'
})
export class ResearchConnectorService {

  constructor(private httpService: HttpClient) {
  }

  ricerca(chiave: string): Observable<Research[]> {
    return this.httpService.get<Research[]>(`http://localhost:3000/ricerca?q=${chiave}&_page=1`);
  }

}
