import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Research } from 'src/app/model/research.model';
import { ResearchConnectorService } from 'src/app/service/research-connector.service';

@Component({
  selector: 'app-insert-form',
  templateUrl: './insert-form.component.html',
  styleUrls: ['./insert-form.component.css'],
})
export class InsertFormComponent implements OnInit {
  newResearchForm!: FormGroup;

  constructor(private researchService: ResearchConnectorService) {}

  ngOnInit(): void {
    this.newResearchForm = new FormGroup({
      titolo: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required),
      chiavi: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (!this.newResearchForm.valid) return;
    this.researchService
      .newResearch({
        titolo: this.newResearchForm.controls.titolo.value,
        descrizione: this.newResearchForm.controls.descrizione.value,
        chiavi: this.newResearchForm.controls.chiavi.value,
        url: this.newResearchForm.controls.url.value,
      })
      ?.subscribe();
    this.newResearchForm.reset();
  }
}
