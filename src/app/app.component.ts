import { Component } from "@angular/core";
import { SignupService } from "./services/signup.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "bibo-app";

  constructor(private signupService: SignupService) {}

  signup(event: any) {
    console.log(event);
    // this.signupService.createUser(event);
  }
}
