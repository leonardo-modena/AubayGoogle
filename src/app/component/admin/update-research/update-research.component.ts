import { Component, Input, OnInit } from '@angular/core';
import { Research } from 'src/app/model/research.model';

@Component({
  selector: 'app-update-research',
  templateUrl: './update-research.component.html',
  styleUrls: ['./update-research.component.css']
})
export class UpdateResearchComponent implements OnInit {

  @Input() researchToUpdate!: Research;

  constructor() { }

  ngOnInit(): void {
  }

}
