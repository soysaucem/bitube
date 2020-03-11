import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadingItemComponent } from './uploading-item.component';

describe('UploadingItemComponent', () => {
  let component: UploadingItemComponent;
  let fixture: ComponentFixture<UploadingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadingItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
