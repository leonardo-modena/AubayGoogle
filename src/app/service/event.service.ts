import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { Research } from '../model/research.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  newResearch = new Subject<string>();
  newLink = new  BehaviorSubject<string>('');

  constructor() { }

  emitResearch(newResearch: Research): void{
    this.newResearch.next(`New Research Emitted title: ${newResearch.titolo}`);
  }

  emitLink(link: string): void{
    this.newLink.next(link);
  }

}
