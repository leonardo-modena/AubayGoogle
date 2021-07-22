import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Research} from "../../model/research.model";
import {ResearchConnectorService} from "../../service/research-connector.service";
import {EventService} from "../../service/event.service";
import { WidgetService } from 'src/app/service/widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  eventServiceSubscription!: Subscription;
  widgetServiceSubscription!: Subscription;

  research!: Research[];
  inputSearch!: FormGroup;

  
  pageLimit!: number;


  loading: boolean = false;
  hiddenPagination = true;

  constructor(private researchService: ResearchConnectorService, private eventService: EventService, private widgetService: WidgetService) {
  }

  ngOnInit(): void {
    this.inputSearch = new FormGroup({
      'searchBar': new FormControl("", Validators.required)
    });

    this.eventServiceSubscription =  this.eventService.newLink
    .subscribe((newLink) => {
      if (newLink) {
          this.researchService.getResearchByUrl(newLink)
            .subscribe(
              (resData) => {
              this.research = resData;
            },
            err =>{
              console.log(err)
            }
            )
        }
      });

      this.widgetServiceSubscription = this.widgetService.actualLimit.subscribe( (limit) => {
        this.pageLimit = limit;
        if (this.inputSearch.valid) {
          this.onSearch()
        }
      })
  }

  onSearch() {
    if (this.inputSearch.valid) {
      this.loading = true;
      setTimeout(() => {
        this.researchService.getResearchByKey(this.inputSearch.controls.searchBar.value, ''+this.pageLimit)
          .subscribe(
            (res) => {
              this.loading = false;
            this.research = res;
            this.hiddenPagination = false;
          },
            (err) => {
              console.log(err)
            }
          );
      }, 800);
    } else {
      alert('inserire parola');
    }
  }

  ngOnDestroy(): void {
    if (this.eventServiceSubscription) {
      this.eventServiceSubscription.unsubscribe()
    }
    if (this.widgetServiceSubscription) {
      this.widgetServiceSubscription.unsubscribe()
    }
  }
}
