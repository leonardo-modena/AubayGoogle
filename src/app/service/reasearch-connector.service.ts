import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReasearchConnectorService {

  constructor(private httpService: HttpClient) { }

  ricerca(chiave: string){
    this.httpService.get(`http://localhost:3000/ricerca?q=${chiave}`).subscribe((data) => {
      console.log(data);
      
    })
  }
}
