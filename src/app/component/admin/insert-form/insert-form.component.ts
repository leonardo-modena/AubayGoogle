import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Research } from 'src/app/model/research.model';
import { EventService } from 'src/app/service/event.service';
import { ResearchConnectorService } from 'src/app/service/research-connector.service';

@Component({
  selector: 'app-insert-form',
  templateUrl: './insert-form.component.html',
  styleUrls: ['./insert-form.component.css'],
})
export class InsertFormComponent implements OnInit {
  errorMessage!: string | null;

  loading: boolean = false;
  
  newResearchForm!: FormGroup;

  constructor(private researchService: ResearchConnectorService, private eventService: EventService) {}

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
    this.loading = true;

    let newResearch: Research = {
      titolo: this.newResearchForm.controls.titolo.value,
      descrizione: this.newResearchForm.controls.descrizione.value,
      chiavi: this.newResearchForm.controls.chiavi.value,
      url: this.newResearchForm.controls.url.value,
    }

    this.researchService
      .newResearch(newResearch)
      ?.subscribe(
        res => {
          this.loading = false;
          this.eventService.emitResearch(newResearch)
        },
        err => {
          this.loading = false;
          this.errorMessage = err;
        }
      );
    this.newResearchForm.reset();
  }
}
