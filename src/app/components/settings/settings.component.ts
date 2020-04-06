import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../services/user/state/user.model';
import { UserService } from '../../services/user/state/user.service';
import { UserQuery } from '../../services/user/state/user.query';
import { UploadController } from '../../controller/upload/upload.controller';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  generateImageUrlFromFile,
  generateImageUrlFromPath,
} from '../../util/generate-image-url';
import { checkPassword } from '../../util/password-validation';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {
  me: User;
  message = 'Email cannot be changed since it is your primary login method';
  myAvatar: string;
  passwordForm: FormGroup;

  private controller = new UploadController();

  constructor(
    private userQuery: UserQuery,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.me = await this.userQuery.getMyAccount();
    this.myAvatar = this.me.avatar;
    this.passwordForm = this.formBuilder.group(
      {
        currentPasswordControl: ['', [Validators.required]],
        passwordControl: ['', [Validators.required]],
        passwordConfirmationControl: ['', [Validators.required]],
      },
      { validator: checkPassword }
    );
  }

  get disabled() {
    return true;
  }

  updateName(event: any) {
    try {
      this.userService.updateUser(this.me.id, { name: event.target.value });
    } catch (err) {
      console.error('Failed to change name');
      console.error(err);
    }
  }

  updatePassword() {}

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

  get currentPasswordControl() {
    return this.passwordForm.get('currentPasswordControl');
  }

  get passwordControl() {
    return this.passwordForm.get('passwordControl');
  }

  get passwordConfirmationControl() {
    return this.passwordForm.get('passwordConfirmationControl');
  }
}
