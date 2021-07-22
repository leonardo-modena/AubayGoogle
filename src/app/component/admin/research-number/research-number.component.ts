import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import { ResearchConnectorService } from 'src/app/service/research-connector.service';

@Component({
  selector: 'app-research-number',
  templateUrl: './research-number.component.html',
  styleUrls: ['./research-number.component.css']
})
export class ResearchNumberComponent implements OnInit {

  numberoOfResearch!: number;

  constructor(private researchService: ResearchConnectorService, private eventService: EventService) { }

  ngOnInit(): void {
    this.researchService.getAllResearch().subscribe( 
      (allResearch) => {
      this.numberoOfResearch = allResearch.length;
    },
      (err) => {
        this.eventService.emitError(err)
      }
    )
  }

}
