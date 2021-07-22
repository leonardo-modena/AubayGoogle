import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WidgetService{
    
    private limit = new BehaviorSubject<number>(5);
    actualLimit = this.limit.asObservable();

    constructor() {}

    newLimit(newLimit: number): void{
        this.limit.next(newLimit);
    }
}