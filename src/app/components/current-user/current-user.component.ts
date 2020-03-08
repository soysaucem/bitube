import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-current-user",
  templateUrl: "./current-user.component.html",
  styleUrls: ["./current-user.component.scss"]
})
export class CurrentUserComponent implements OnInit {
  me: User;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.me = await this.userService.getMyAccount();
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(["login"]);
  }
}
