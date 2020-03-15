import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { SignupComponent } from './components/signup/signup.component';
import { UploadRoutingModule } from './components/upload/upload-routing.module';
import { VideoGridRoutingModule } from './components/video-grid/video-grid-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { WatchVideoComponent } from './components/watch-video/watch-video.component';

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
    path: 'forgot-password',
    component: ForgotPasswordComponent,
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
      { path: 'watch/:id', component: WatchVideoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
