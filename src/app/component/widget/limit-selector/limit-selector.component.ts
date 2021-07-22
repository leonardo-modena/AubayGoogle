import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WidgetService } from 'src/app/service/widget.service';

@Component({
  selector: 'app-limit-selector',
  templateUrl: './limit-selector.component.html',
  styleUrls: ['./limit-selector.component.css']
})
export class LimitSelectorComponent implements OnInit {

  limitForm!: FormGroup;

  constructor(private widgetService: WidgetService) { }

  ngOnInit(): void {
    this.limitForm = new FormGroup({
      "selectLimit": new FormControl(5),
    })
  }

  onChangeLimit(): void{
    this.widgetService.newLimit(this.limitForm.controls.selectLimit.value);
  }

}
