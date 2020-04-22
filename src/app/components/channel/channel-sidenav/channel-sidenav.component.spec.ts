import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSidenavComponent } from './channel-sidenav.component';

describe('ChannelSidenavComponent', () => {
  let component: ChannelSidenavComponent;
  let fixture: ComponentFixture<ChannelSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
