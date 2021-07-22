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
  @ViewChild('cl') checkList: any;

  buttonList: any;

  eventServiceSubscription!: Subscription;

  researchList!: Research[];

  researchSelectedArray: number[] = [];

  researchToUpdate!: Research | undefined;

  checked: boolean = false;

  researchMenu: boolean = false;

  constructor(
    private researchService: ResearchConnectorService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.researchService
      .getAllResearch()
      .subscribe(
        (allResearch: Research[]) => {
        this.researchList = allResearch;
      },
        (err) => {
          this.eventService.emitError(err);
        }
      );

    this.eventServiceSubscription = this.eventService.newResearch.subscribe(
      (researchLog: string) => {
        console.log(researchLog);
        this.researchService
          .getAllResearch()
          .subscribe((allResearch: Research[]) => {
            this.researchList = allResearch;
            this.unCheckElement();
            this.researchSelectedArray = [];
            this.checked = false;
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

    this.eventServiceSubscription = this.eventService.updateResearch.subscribe(
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
    if (!(this.researchSelectedArray.length < 1)) {
      this.researchService.deleteResearch(this.researchSelectedArray).subscribe(
        (res) => {
          this.eventService.emitDeleteResearc(this.researchSelectedArray);
        },
        (err) => {
          console.log(err);
        }
      );
      this.unCheckElement();
      this.researchSelectedArray = [];
      this.checked = false;
    } else return;
  }

  onUpdate(): void {
    if (!(this.researchSelectedArray.length > 1)) {
      this.researchToUpdate = this.researchList.filter((el) => {
        if (el.id === this.researchSelectedArray[0]) {
          return el;
        } else return;
      })[0];
      this.unCheckElement();
      this.researchSelectedArray = [];
      this.checked = false;
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
    }
    if (this.researchSelectedArray.length > 0) {
      this.checked = true;
    } else if (this.researchSelectedArray.length === 0) {
      this.checked = false;
    }
  }

  //on Develop
  // checkUncheckElement(id: number){
  //   this.checkList.nativeElement.childNodes[id].childNodes[0][0].checked = !this.checkList.nativeElement.childNodes[id].childNodes[0][0].checked
  //   this.addSelectedElement(id + 1);
  // }

  unCheckElement(): void {
    this.checkList.nativeElement.childNodes.forEach((element: any) => {
      if (element.nodeType === 1) {
        if (element.childNodes[0][0].checked) {
          element.childNodes[0][0].checked = false;
        }
      }
    });
  }

  //toCheck === true to select all elements; false to deselect all elements
  checkUncheckAll(toCheck: boolean): void {
    this.checkList.nativeElement.childNodes.forEach((element: any) => {
      if (element.nodeType === 1) {
        if (toCheck) {
          element.childNodes[0][0].checked = true;
          this.researchSelectedArray = [];
          this.researchList.forEach((research) => {
            if (research.id) this.researchSelectedArray.push(research.id);
          });
          this.checked = true;
        } else {
          element.childNodes[0][0].checked = false;
          this.researchSelectedArray = [];
          this.checked = false;
        }
      }
    });
  }

  clickMenu(): void {
    this.researchMenu = !this.researchMenu;
  }

  ngOnDestroy(): void {
    this.eventServiceSubscription.unsubscribe();
  }
}
