import { Component, OnDestroy, OnInit } from '@angular/core';
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


  constructor(private researchService: ResearchConnectorService, private eventService: EventService) { }

  ngOnInit(): void {
    this.researchService.getAllResearch().subscribe( (allResearch: Research[]) => {
      this.researchList = allResearch;
    })

    this.eventServiceSubscription = this.eventService.newResearch.subscribe( (researchLog: string) => {
      console.log(researchLog);
      this.researchService.getAllResearch().subscribe( (allResearch: Research[]) => {
        this.researchList = allResearch;
      } )
    })
  }

  ngOnDestroy(): void {
    this.eventServiceSubscription.unsubscribe()
  }

}
