import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { UploadRoutingModule } from './components/upload/upload-routing.module';
import { VideoGridRoutingModule } from './components/video-grid/video-grid-routing.module';
import { LoginGuard } from './guards/login.guard';
import { UploadingGuard } from './guards/uploading.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: MainpageComponent,
    children: [
      {
        path: 'upload',
        loadChildren: () => UploadRoutingModule,
      },
      { path: '', loadChildren: () => VideoGridRoutingModule },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
