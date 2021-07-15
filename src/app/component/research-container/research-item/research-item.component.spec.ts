import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchItemComponent } from './research-item.component';

describe('ResearchItemComponent', () => {
  let component: ResearchItemComponent;
  let fixture: ComponentFixture<ResearchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
