import { Component, OnInit, Input } from "@angular/core";
import { List } from "immutable";
import { UploadController } from "src/app/services/upload.controller";
import { FileQueueObject } from "src/app/models/file-queue.model";

@Component({
  selector: "app-uploading",
  templateUrl: "./uploading.component.html",
  styleUrls: ["./uploading.component.scss"]
})
export class UploadingComponent implements OnInit {
  @Input() controller: UploadController;

  uploadingFiles: List<FileQueueObject>;

  constructor() {}

  ngOnInit() {
    this.controller.selectAll().subscribe(files => {
      this.uploadingFiles = files;
    });
  }
}
