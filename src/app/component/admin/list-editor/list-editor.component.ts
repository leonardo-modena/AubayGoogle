import {  Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Research } from 'src/app/model/research.model';
import { EventService } from 'src/app/service/event.service';
import { ResearchConnectorService } from 'src/app/service/research-connector.service';

@Component({
  selector: 'app-list-editor',
  templateUrl: './list-editor.component.html',
  styleUrls: ['./list-editor.component.css']
})
export class ListEditorComponent implements OnInit, OnDestroy {

  eventServiceSubscription!: Subscription;

  researchList!: Research[];

  toDeleteArray: number[] = []; 

  researchToUpdate!: Research;

  
  @ViewChild('f') searchForm!: ElementRef;

  constructor(private researchService: ResearchConnectorService, private eventService: EventService) { }

  ngOnInit(): void {


    this.researchService.getAllResearch().subscribe( (allResearch: Research[]) => {
      this.researchList = allResearch;
    });

    this.eventServiceSubscription = this.eventService.newResearch.subscribe( (researchLog: string) => {
      console.log(researchLog);
      this.researchService.getAllResearch().subscribe( (allResearch: Research[]) => {
        this.researchList = allResearch;
      } )
    });

    this.eventServiceSubscription = this.eventService.deleteResearch.subscribe( (researchLog: string) => {
      console.log(researchLog);
      this.researchService.getAllResearch().subscribe( (allResearch: Research[]) => {
        this.researchList = allResearch;
      } )
    })

  }

  onDelete(): void {
    console.log(this.toDeleteArray)
    this.researchService.deleteResearch(this.toDeleteArray)
    .subscribe( 
      (res) => {
        this.eventService.emitDeleteResearc(this.toDeleteArray)
      },
      err => {console.log(err)}
    )
  }

  ngOnDestroy(): void {
    this.eventServiceSubscription.unsubscribe()
  }

  addRemoveElement(elementId: number | undefined){
    if (elementId) {   
      if ( !(this.toDeleteArray.includes(elementId)) ) {
        this.toDeleteArray.push(elementId);
      }else {
        let arrayId = this.toDeleteArray.indexOf(elementId);
        this.toDeleteArray.splice(arrayId,1);
      }
    }
  }


}
