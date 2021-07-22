import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Research} from "../../model/research.model";
import {ResearchConnectorService} from "../../service/research-connector.service";
import {EventService} from "../../service/event.service";
import { WidgetService } from 'src/app/service/widget.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  research!: Research[];
  inputSearch!: FormGroup;

  
  pageLimit!: number;


  hiddenPagination = true;

  constructor(private researchService: ResearchConnectorService, private eventService: EventService, private widgetService: WidgetService) {
  }

  ngOnInit(): void {
    this.inputSearch = new FormGroup({
      'searchBar': new FormControl("", Validators.required)
    });

    this.eventService.newLink
      .subscribe((newLink) => {
        if (newLink) {
          this.researchService.getResearchByUrl(newLink)
            .subscribe(resData => {
              this.research = resData;
            })
        }
      });

      this.widgetService.actualLimit.subscribe( (limit) => {
        this.pageLimit = limit;
        if (this.inputSearch.valid) {
          this.onSearch()
        }
      })
  }

  onSearch() {
    if (this.inputSearch.valid) {
      this.researchService.getResearchByKey(this.inputSearch.controls.searchBar.value, ''+this.pageLimit)
        .subscribe((res) => {
          this.research = res;
          this.hiddenPagination = false;
        });
    } else {
      alert('inserire parola');
    }
  }
}
