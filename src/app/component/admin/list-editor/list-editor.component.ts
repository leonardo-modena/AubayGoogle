import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  
  @ViewChild('f') searchForm!: NgForm;

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

  onDelete(): void {
    console.log(this.searchForm.controls)

  }

  ngOnDestroy(): void {
    this.eventServiceSubscription.unsubscribe()
  }



}
