import { ComponentWithSubscription } from './../../abstract-components/component-with-subscription';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UploadController } from '../../controller/upload/upload.controller';
import { AuthService } from '../../services/auth.service';
import { UserQuery } from '../../state/user/user.query';
import { UserService } from '../../state/user/user.service';
import {
  generateImageUrlFromFile,
  generateImageUrlFromPath,
} from '../../util/generate-image-url';
import { Title } from '@angular/platform-browser';
import { User } from '../../models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent
  extends ComponentWithSubscription
  implements OnInit {
  me: User;
  myFirebaseAccount: firebase.User;
  message: string =
    'Email cannot be changed since it is your primary login method.';
  myAvatar: string;

  newPassword: string;

  private currentPassword: string;
  private currentPasswordValid: boolean = false;
  private newPasswordValid: boolean = false;
  private passwordConfirmValid: boolean = false;

  private controller = new UploadController();

  constructor(
    private userQuery: UserQuery,
    private userService: UserService,
    private authService: AuthService,
    private titleService: Title
  ) {
    super();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Settings');

    this.autoUnsubscribe(this.userQuery.selectMyAccount()).subscribe((me) => {
      this.me = me;
      this.myAvatar = this.me.avatar;
    });

    this.autoUnsubscribe(this.userQuery.selectMyFirebaseAccount()).subscribe(
      (myFirebaseAccount) => (this.myFirebaseAccount = myFirebaseAccount)
    );
  }

  get disabled() {
    return !(
      this.currentPasswordValid &&
      this.newPasswordValid &&
      this.passwordConfirmValid
    );
  }

  handleCurrentPassword(event: string) {
    this.currentPassword = event;
  }

  handleNewPassword(event: string) {
    this.newPassword = event;
  }

  handleCurrentPasswordValid(event: boolean) {
    this.currentPasswordValid = event;
  }

  handleNewPasswordValid(event: boolean) {
    this.newPasswordValid = event;
  }

  handlePasswordConfirmValid(event: boolean) {
    this.passwordConfirmValid = event;
  }

  updateName(event: string) {
    if (event) {
      try {
        this.userService.updateUser(this.me.id, { name: event });
      } catch (err) {
        console.error('Failed to change name');
        console.error(err);
      }
    }
  }

  async updatePassword() {
    await this.authService.changePassword(
      this.currentPassword,
      this.newPassword
    );
  }

  async updateProfileImage(event: any) {
    try {
      const dataUrl = await generateImageUrlFromFile(event.target.files[0]);
      const webpDataUrl = await generateImageUrlFromPath(dataUrl);
      const res = await this.controller.uploadImage(
        this.me.id,
        webpDataUrl,
        'profile'
      );
      const avatarLocation = await res.ref.getDownloadURL();
      this.userService.updateUser(this.me.id, {
        avatar: avatarLocation,
      });
      this.myAvatar = webpDataUrl;
    } catch (err) {
      console.error('Failed to change profile image');
      console.error(err);
    }
  }

  get verificationIcon(): string {
    return this.myFirebaseAccount.emailVerified ? 'check_circle' : 'cancel';
  }

  get statusStyle(): string {
    return this.myFirebaseAccount.emailVerified
      ? 'text-success'
      : 'text-danger';
  }

  get tooltipMessage(): string {
    return this.myFirebaseAccount.emailVerified ? 'Verified' : 'Pending';
  }
}
