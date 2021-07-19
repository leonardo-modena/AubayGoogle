import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Research} from "../../model/research.model";
import {ResearchConnectorService} from "../../service/research-connector.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  research!: Research[];
  inputSearch!: FormGroup;

  constructor(private researchService: ResearchConnectorService) {
  }

  ngOnInit(): void {
    this.inputSearch = new FormGroup({
      'searchBar': new FormControl("", Validators.required)
    });
  }

  onSearch() {
    if (this.inputSearch.valid) {
      this.researchService.research(this.inputSearch.controls.searchBar.value)
        .subscribe((res: Research[]) => {
          this.research = res;
        });
    } else {
      alert('inserire parola');
    }
  }
}
