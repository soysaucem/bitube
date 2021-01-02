import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../state/user/user.service';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  async signup(email: string, password: string, name: string): Promise<any> {
    // Create user in user pool
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    res.user.sendEmailVerification();

    // Create user entity in database
    return await this.userService.addUser(res.user.uid, res.user.email, name);
  }
}
