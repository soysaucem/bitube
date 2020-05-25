import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySectionComponent } from './history-section.component';

describe('HistorySectionComponent', () => {
  let component: HistorySectionComponent;
  let fixture: ComponentFixture<HistorySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
