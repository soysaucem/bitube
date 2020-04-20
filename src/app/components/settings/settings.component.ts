import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UploadController } from '../../controller/upload/upload.controller';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/user/state/user.model';
import { UserQuery } from '../../services/user/state/user.query';
import { UserService } from '../../services/user/state/user.service';
import {
  generateImageUrlFromFile,
  generateImageUrlFromPath,
} from '../../util/generate-image-url';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {
  me: User;
  message = 'Email cannot be changed since it is your primary login method.';
  myAvatar: string;

  newPassword: string;

  private currentPassword: string;
  private currentPasswordValid = false;
  private newPasswordValid = false;
  private passwordConfirmValid = false;

  private controller = new UploadController();

  constructor(
    private userQuery: UserQuery,
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.me = await this.userQuery.getMyAccount();
    this.myAvatar = this.me.avatar;
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

      this.userService.updateUser(this.me.id, { avatar: res.Location });
      this.myAvatar = webpDataUrl;
    } catch (err) {
      console.error('Failed to change profile image');
      console.error(err);
    }
  }
}
