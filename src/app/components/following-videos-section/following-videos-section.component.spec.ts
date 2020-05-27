import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingVideosSectionComponent } from './following-videos-section.component';

describe('FollowingVideosSectionComponent', () => {
  let component: FollowingVideosSectionComponent;
  let fixture: ComponentFixture<FollowingVideosSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingVideosSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingVideosSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
