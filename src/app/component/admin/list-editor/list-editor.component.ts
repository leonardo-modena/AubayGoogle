import { Component, OnInit } from '@angular/core';
import { Research } from 'src/app/model/research.model';
import { ResearchConnectorService } from 'src/app/service/research-connector.service';

@Component({
  selector: 'app-list-editor',
  templateUrl: './list-editor.component.html',
  styleUrls: ['./list-editor.component.css']
})
export class ListEditorComponent implements OnInit {

  researchList!: Research[];


  constructor(private researchService: ResearchConnectorService) { }

  ngOnInit(): void {
    this.researchService.getAllResearch().subscribe( (allResearch: Research[]) => {
      this.researchList = allResearch;
    })
  }

}
