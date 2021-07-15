import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResearchConnectorService {

  constructor(private httpService: HttpClient) {
  }

  ricerca(chiave: string) {
    return this.httpService.get(`http://localhost:3000/ricerca?q=${chiave}`)
      .subscribe((data) => {
        console.log(data);
      })
  }
}
