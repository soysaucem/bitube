import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/mainpage/mainpage.component';
import { UploadRoutingModule } from './components/upload/upload-routing.module';
import { MainPageVideosRoutingModule } from './components/mainpage-videos/mainpage-videos-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { WatchVideoComponent } from './components/watch-video/watch-video.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SettingsRoutingModule } from './components/settings/settings-routing.module';
import { HistoryRoutingModule } from './components/history/history-routing.module';
import { FollowingVideosRoutingModule } from './components/following-videos/following-videos-routing.module';
import { TrendingPageRoutingModule } from './components/trending-page/trending-page-routing.module';
import { ChannelComponent } from './components/channel/channel.component';

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
    component: MainPageComponent,
    children: [
      {
        path: 'upload',
        loadChildren: () => UploadRoutingModule,
      },
      { path: '', loadChildren: () => MainPageVideosRoutingModule },
      { path: 'settings', loadChildren: () => SettingsRoutingModule },
      { path: 'history', loadChildren: () => HistoryRoutingModule },
      { path: 'followings', loadChildren: () => FollowingVideosRoutingModule },
      { path: 'trending', loadChildren: () => TrendingPageRoutingModule },
      { path: 'watch/:id', component: WatchVideoComponent },
      { path: 'channel/:id', component: ChannelComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
