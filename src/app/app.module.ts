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
import { CookieService } from 'ngx-cookie-service';
import { MetaModule } from 'ng2-meta';

// Angular Material Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Components
import { AuthGuard } from './guards/auth.guard';
import { MainPageComponent } from './components/mainpage/mainpage.component';
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
import { AuthWrapperComponent } from './components/auth/auth-wrapper/auth-wrapper.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FollowingVideosComponent } from './components/following-videos/following-videos.component';
import { FollowingChannelsComponent } from './components/following-channels/following-channels.component';
import { ValidationInputComponent } from './components/validation-input/validation-input.component';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { HistoryComponent } from './components/history/history.component';
import { NotificationComponent } from './components/notification/notification.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { MainPageVideosComponent } from './components/mainpage-videos/mainpage-videos.component';
import { MenuWrapperComponent } from './components/menu-wrapper/menu-wrapper.component';
import { ChannelHeaderComponent } from './components/channel/channel-header/channel-header.component';
import { ChannelComponent } from './components/channel/channel.component';
import { ChannelSidenavComponent } from './components/channel/channel-sidenav/channel-sidenav.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FollowingChannelsItemComponent } from './components/following-channels-item/following-channels-item.component';
import { HistoryItemComponent } from './components/history-item/history-item.component';
import { HistorySectionComponent } from './components/history-section/history-section.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { VideoListItemComponent } from './components/video-list-item/video-list-item.component';
import { FollowingVideosSectionComponent } from './components/following-videos-section/following-videos-section.component';
import { VideoEditingDialogComponent } from './components/video-editing-dialog/video-editing-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
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
    AuthWrapperComponent,
    SidenavComponent,
    FollowingVideosComponent,
    FollowingChannelsComponent,
    ValidationInputComponent,
    VideoItemComponent,
    HistoryComponent,
    NotificationComponent,
    DataListComponent,
    MainPageVideosComponent,
    MenuWrapperComponent,
    ChannelHeaderComponent,
    ChannelComponent,
    ChannelSidenavComponent,
    ConfirmationDialogComponent,
    FollowingChannelsItemComponent,
    HistoryItemComponent,
    HistorySectionComponent,
    PlaylistComponent,
    VideoListItemComponent,
    FollowingVideosSectionComponent,
    VideoEditingDialogComponent,
  ],
  imports: [
    environment.production ? [] : AkitaNgDevtools.forRoot(),
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
    HttpClientModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    NgbModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule,
    DragDropModule,
    MetaModule.forRoot(),
  ],
  providers: [AuthGuard, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
