import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchContainerComponent } from './research-container.component';

describe('ResearchContainerComponent', () => {
  let component: ResearchContainerComponent;
  let fixture: ComponentFixture<ResearchContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
