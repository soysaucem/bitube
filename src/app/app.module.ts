import { environment } from '../environments/environment';

// App Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Modules
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

// Components
import { AuthGuard } from './guards/auth.guard';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CurrentUserComponent } from './components/current-user/current-user.component';
import { UploadComponent } from './components/upload/upload.component';
import { UploadingComponent } from './components/upload/uploading/uploading.component';
import { UploadingItemComponent } from './components/upload/uploading/uploading-item/uploading-item.component';
import { VideoGridComponent } from './components/video-grid/video-grid.component';
import { WatchVideoComponent } from './components/watch-video/watch-video.component';
import { CommentComponent } from './components/comment/comment.component';
import { SearchComponent } from './components/search/search.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { CommentItemComponent } from './components/comment/comment-item/comment-item.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MyVideosComponent } from './components/my-videos/my-videos.component';
import { AuthWrapperComponent } from './components/auth/auth-wrapper/auth-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    CurrentUserComponent,
    UploadComponent,
    UploadingComponent,
    UploadingItemComponent,
    VideoGridComponent,
    ForgotPasswordComponent,
    WatchVideoComponent,
    CommentComponent,
    SearchComponent,
    CommentItemComponent,
    AvatarComponent,
    SettingsComponent,
    MyVideosComponent,
    AuthWrapperComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatPasswordStrengthModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatRippleModule,
    MatProgressBarModule,
    MatGridListModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatTabsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
