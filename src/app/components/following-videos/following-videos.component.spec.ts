import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingVideosComponent } from './following-videos.component';

describe('FollowingVideosComponent', () => {
  let component: FollowingVideosComponent;
  let fixture: ComponentFixture<FollowingVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
