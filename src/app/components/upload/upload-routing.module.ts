import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload.component';
import { UploadingGuard } from '../../guards/uploading.guard';
import { LoginGuard } from '../../guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: UploadComponent,
    canActivate: [LoginGuard],
    canDeactivate: [UploadingGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadRoutingModule {}
