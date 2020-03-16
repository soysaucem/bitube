import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UploadComponent } from '../components/upload/upload.component';
import { warningUploading } from '../util/variables';

@Injectable({
  providedIn: 'root',
})
export class UploadingGuard implements CanDeactivate<UploadComponent> {
  constructor() {}

  canDeactivate(component: UploadComponent) {
    if (component.hasUploadingJob()) {
      if (confirm(warningUploading)) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
