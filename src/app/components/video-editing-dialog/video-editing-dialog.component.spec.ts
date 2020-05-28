import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEditingDialogComponent } from './video-editing-dialog.component';

describe('VideoEditingDialogComponent', () => {
  let component: VideoEditingDialogComponent;
  let fixture: ComponentFixture<VideoEditingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoEditingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoEditingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
