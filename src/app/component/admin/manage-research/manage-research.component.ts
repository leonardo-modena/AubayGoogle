import { Component, Input, OnInit } from '@angular/core';
import { Research } from 'src/app/model/research.model';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-manage-research',
  templateUrl: './manage-research.component.html',
  styleUrls: ['./manage-research.component.css']
})
export class ManageResearchComponent implements OnInit {

  @Input() researchToUpdate!: Research | undefined;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  exitClick(){    
    this.eventService.emitEndOfUpdate();
  }

}
