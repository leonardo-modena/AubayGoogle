import { Component, Input, OnInit } from '@angular/core';
import { Research } from 'src/app/model/research.model';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-update-research',
  templateUrl: './update-research.component.html',
  styleUrls: ['./update-research.component.css']
})
export class UpdateResearchComponent implements OnInit {

  @Input() researchToUpdate!: Research | undefined;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  exitClick(){
    console.log("cliccato");
    
    this.eventService.emitEndOfUpdate();
  }

}
