import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Research } from 'src/app/model/research.model';
import { EventService } from 'src/app/service/event.service';
import { ResearchConnectorService } from 'src/app/service/research-connector.service';

@Component({
  selector: 'app-list-editor',
  templateUrl: './list-editor.component.html',
  styleUrls: ['./list-editor.component.css'],
})
export class ListEditorComponent implements OnInit, OnDestroy {
  eventServiceSubscription!: Subscription;

  researchList!: Research[];

  researchSelectedArray: number[] = [];

  researchToUpdate!: Research | undefined;

  @ViewChild('f') searchForm!: ElementRef;

  constructor(
    private researchService: ResearchConnectorService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.researchService
      .getAllResearch()
      .subscribe((allResearch: Research[]) => {
        this.researchList = allResearch;
      });

    this.eventServiceSubscription = this.eventService.newResearch.subscribe(
      (researchLog: string) => {
        console.log(researchLog);
        this.researchService
          .getAllResearch()
          .subscribe((allResearch: Research[]) => {
            this.researchList = allResearch;
          });
      }
    );

    this.eventServiceSubscription = this.eventService.deleteResearch.subscribe(
      (researchLog: string) => {
        console.log(researchLog);
        this.researchService
          .getAllResearch()
          .subscribe((allResearch: Research[]) => {
            this.researchList = allResearch;
          });
      }
    );

    this.eventServiceSubscription = this.eventService.endUpdate.subscribe(
      (value) => {
        this.researchToUpdate = value;
      }
    );
  }

  onDelete(): void {
    this.researchService.deleteResearch(this.researchSelectedArray).subscribe(
      (res) => {
        this.eventService.emitDeleteResearc(this.researchSelectedArray);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onUpdate(): void {
    if (!(this.researchSelectedArray.length > 1)) {
      this.researchToUpdate =
        this.researchList.filter((el) => {
          if (el.id === this.researchSelectedArray[0]) {
            return el;
          } else return;
        })[0]
      
    } else return;
  }

  addSelectedElement(elementId: number | undefined): void {
    if (elementId) {
      if (!this.researchSelectedArray.includes(elementId)) {
        this.researchSelectedArray.push(elementId);
      } else {
        let arrayId = this.researchSelectedArray.indexOf(elementId);
        this.researchSelectedArray.splice(arrayId, 1);
      }
      console.log(this.researchSelectedArray);
    }
  }

  ngOnDestroy(): void {
    this.eventServiceSubscription.unsubscribe();
  }
}
