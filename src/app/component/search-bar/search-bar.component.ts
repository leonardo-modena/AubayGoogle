import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ResearchConnectorService} from 'src/app/service/research-connector.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  inputSearch!: FormGroup;

  constructor(private researchService: ResearchConnectorService) {
  }

  ngOnInit(): void {
    this.inputSearch = new FormGroup({
      'searchBar': new FormControl("", Validators.required)
    });
  }

  onSearch() {
    this.researchService.ricerca(this.inputSearch.controls.searchBar.value);
  }

}
