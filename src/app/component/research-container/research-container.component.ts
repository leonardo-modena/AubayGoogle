import {Component, Input, OnInit} from '@angular/core';
import {Research} from "../../model/research.model";

@Component({
  selector: 'app-research-container',
  templateUrl: './research-container.component.html',
  styleUrls: ['./research-container.component.css']
})
export class ResearchContainerComponent implements OnInit {
  // @Input() research!: Research[];


  // p: number = 1;
  // totalLength: any;

  constructor() { }

  ngOnInit(): void {
  }

}
