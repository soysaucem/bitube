import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-current-user",
  templateUrl: "./current-user.component.html",
  styleUrls: ["./current-user.component.scss"]
})
export class CurrentUserComponent implements OnInit {
  user = "dummyuser";

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async logout() {
    await this.auth.logout();
    this.router.navigate(["login"]);
  }
}
