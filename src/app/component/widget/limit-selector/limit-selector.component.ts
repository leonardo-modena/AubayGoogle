import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WidgetService } from 'src/app/service/widget.service';

@Component({
  selector: 'app-limit-selector',
  templateUrl: './limit-selector.component.html',
  styleUrls: ['./limit-selector.component.css'],
})
export class LimitSelectorComponent implements OnInit, OnDestroy {
  widgetSubscription!: Subscription;
  
  limitForm!: FormGroup;

  limitSelected: number = 5;

  constructor(private widgetService: WidgetService) {}

  ngOnInit(): void {
    this.widgetSubscription = this.widgetService.actualLimit.subscribe((actualLimit) => {
      this.limitSelected = actualLimit;
    });

    this.limitForm = new FormGroup({
      selectLimit: new FormControl(this.limitSelected),
    });
  }

  onChangeLimit(): void {
    this.widgetService.newLimit(this.limitForm.controls.selectLimit.value);
  }

  ngOnDestroy(): void {
    this.widgetSubscription.unsubscribe()
  }
}
