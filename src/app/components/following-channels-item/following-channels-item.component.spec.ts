import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingChannelsItemComponent } from './following-channels-item.component';

describe('FollowingChannelsItemComponent', () => {
  let component: FollowingChannelsItemComponent;
  let fixture: ComponentFixture<FollowingChannelsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingChannelsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingChannelsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
