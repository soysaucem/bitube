import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { UserService } from './user/state/user.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  path = '/users';

  constructor(
    private firebaseAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  async signup(email: string, password: string, name: string) {
    // Create user in user pool
    const res = await this.firebaseAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    // Send verification link to user email
    const user = await this.firebaseAuth.user.pipe(take(1)).toPromise();
    user.sendEmailVerification();

    // Create user entity in database
    return await this.userService.addUser(res.user.uid, res.user.email, name);
  }
}
