import {Component, Input, OnInit} from '@angular/core';
import {Research} from "../../model/research.model";

@Component({
  selector: 'app-research-container',
  templateUrl: './research-container.component.html',
  styleUrls: ['./research-container.component.css']
})
export class ResearchContainerComponent implements OnInit {
  @Input() onResearch!: Research[];

  page: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
