import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { MainpageComponent } from "./components/mainpage/mainpage.component";
import { UploadComponent } from "./components/upload/upload.component";
import { UploadRoutingModule } from "./components/upload/upload-routing.module";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "",
    component: MainpageComponent,
    children: [{ path: "upload", loadChildren: () => UploadRoutingModule }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
