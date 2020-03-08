import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { VideoService } from "../../services/video.service";
import { Video } from "../../models/video.model";
import { List } from "immutable";
import { Observable } from "rxjs";

@Component({
  selector: "app-mainpage",
  templateUrl: "./mainpage.component.html",
  styleUrls: ["./mainpage.component.scss"]
})
export class MainpageComponent implements OnInit {
  videos$: Observable<List<Video>>;

  constructor(readonly auth: AuthService, private videoService: VideoService) {}

  ngOnInit() {
    this.videos$ = this.videoService.selectAll();
  }
}
