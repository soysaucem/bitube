import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate() {
    if (await this.auth.isAuthenticated()) {
      return true;
    }

    this.router.navigate(["login"]);
    return false;
  }
}
