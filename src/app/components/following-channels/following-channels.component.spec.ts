import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingChannelsComponent } from './following-channels.component';

describe('FollowingChannelsComponent', () => {
  let component: FollowingChannelsComponent;
  let fixture: ComponentFixture<FollowingChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
