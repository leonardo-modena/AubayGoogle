import { Component, OnInit } from '@angular/core';
import { ResearchConnectorService } from 'src/app/service/research-connector.service';

@Component({
  selector: 'app-research-number',
  templateUrl: './research-number.component.html',
  styleUrls: ['./research-number.component.css']
})
export class ResearchNumberComponent implements OnInit {

  numberoOfResearch!: number;

  constructor(private researchService: ResearchConnectorService) { }

  ngOnInit(): void {
    this.researchService.getAllResearch().subscribe( (allResearch) => {
      this.numberoOfResearch = allResearch.length;
    })
  }

}
