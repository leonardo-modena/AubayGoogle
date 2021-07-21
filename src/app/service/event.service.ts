import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { Research } from '../model/research.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  newResearch = new Subject<string>();

  deleteResearch = new Subject<string>();

  endUpdate = new Subject<undefined>();

  newLink = new  BehaviorSubject<string>('');


  constructor() { }

  emitResearch(newResearch: Research): void{
    this.newResearch.next(`New Research Emitted title: ${newResearch.titolo}`);
  }

  emitDeleteResearc(idDeletedResearch: number[]): void{
    this.deleteResearch.next(`Research Deleted id: ${idDeletedResearch.toString()}`)
  }

  emitEndOfUpdate(){
    this.endUpdate.next(undefined);
  }

  emitLink(link: string): void{
    this.newLink.next(link);
  }

  

}
