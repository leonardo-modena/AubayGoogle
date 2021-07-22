import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Research } from 'src/app/model/research.model';
import { EventService } from 'src/app/service/event.service';
import { ResearchConnectorService } from 'src/app/service/research-connector.service';

@Component({
  selector: 'app-research-form',
  templateUrl: './research-form.component.html',
  styleUrls: ['./research-form.component.css'],
})
export class ResearchFormComponent implements OnInit {
  @Input() updateResearch!: Research | undefined;

  errorMessage!: string | null;

  loading: boolean = false;

  newResearchForm!: FormGroup;

  constructor(
    private researchService: ResearchConnectorService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    if (!this.updateResearch) {
      this.newResearchForm = new FormGroup({
        titolo: new FormControl('', Validators.required),
        descrizione: new FormControl('', Validators.required),
        chiavi: new FormControl('', Validators.required),
        url: new FormControl('', Validators.required),
      });
    } else {
      this.newResearchForm = new FormGroup({
        titolo: new FormControl(this.updateResearch.titolo, Validators.required),
        descrizione: new FormControl(this.updateResearch.descrizione, Validators.required),
        chiavi: new FormControl(this.updateResearch.chiavi, Validators.required),
        url: new FormControl(this.updateResearch.url, Validators.required),
      });
    }
    
  }

  onSubmit(): void {
    if (!this.newResearchForm.valid) return;
    
    let actualResearch: Research = {
      titolo: this.newResearchForm.controls.titolo.value,
      descrizione: this.newResearchForm.controls.descrizione.value,
      chiavi: this.newResearchForm.controls.chiavi.value,
      url: this.newResearchForm.controls.url.value,
    };


    if (!this.updateResearch) {
      this.loading = true;

      this.researchService.newResearch(actualResearch)?.subscribe(
        (res) => {
          this.loading = false;
          this.eventService.emitResearch(actualResearch);
          
        },
        (err) => {
          this.loading = false;
          this.errorMessage = err;
        }
      );
    } else {
      this.researchService.updateResearch(this.updateResearch.id, actualResearch)?.subscribe( 
        (res) => {
          this.eventService.emitUpdateResearch(res);
          this.eventService.emitEndOfUpdate();
        },
        (err) => {
          console.log(err)
        }
       )
    }

    this.newResearchForm.reset();
  }
}
