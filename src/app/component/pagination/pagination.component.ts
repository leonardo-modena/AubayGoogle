import { Component, OnInit } from '@angular/core';
import {ResearchConnectorService} from "../../service/research-connector.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  link: string[] = [];

  constructor(private researchService: ResearchConnectorService) { }

  ngOnInit(): void {
    this.researchService.link.subscribe(res => {
      if (res) {
        this.link = res.split(',');
      }
      console.log(this.link);
    });
  }

}
