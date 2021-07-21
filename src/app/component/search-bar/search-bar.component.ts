import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Research} from "../../model/research.model";
import {ResearchConnectorService} from "../../service/research-connector.service";
import {EventService} from "../../service/event.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  research!: Research[];
  inputSearch!: FormGroup;

  hiddenPagination = true;

  constructor(private researchService: ResearchConnectorService, private eventService: EventService) {
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
              console.log(newLink);
              this.research = resData;
            })
        }
        // console.log(newLink);
      })
  }

  onSearch() {
    if (this.inputSearch.valid) {
      this.researchService.getResearchByKey(this.inputSearch.controls.searchBar.value, '1')
        .subscribe((res) => {
          this.research = res;
          this.hiddenPagination = false;
        });
    } else {
      alert('inserire parola');
    }
  }
}
