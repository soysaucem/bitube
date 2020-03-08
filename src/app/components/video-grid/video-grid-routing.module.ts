import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VideoGridComponent } from "./video-grid.component";

const routes: Routes = [
  {
    path: "",
    component: VideoGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoGridRoutingModule {}
