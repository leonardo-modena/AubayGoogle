import {Component, Input, OnInit} from '@angular/core';
import {Research} from "../../model/research.model";

@Component({
  selector: 'app-research-item',
  templateUrl: './research-item.component.html',
  styleUrls: ['./research-item.component.css']
})
export class ResearchItemComponent implements OnInit {
  @Input() onResearch!: Research[];

  constructor() { }

  ngOnInit(): void {
  }

}
