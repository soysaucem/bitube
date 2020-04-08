import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageVideosComponent } from './mainpage-videos.component';

describe('MainpageVideosComponent', () => {
  let component: MainPageVideosComponent;
  let fixture: ComponentFixture<MainPageVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageVideosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
