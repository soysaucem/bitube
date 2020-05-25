import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { User } from '../../services/user/state/user.model';
import { UserQuery } from '../../services/user/state/user.query';
import { Video } from '../../services/video/state/video.model';
import { VideoService } from '../../services/video/state/video.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

export type ItemType = 'card' | 'card-settings';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit {
  @Input() me: User;
  @Input() video: Video;
  @Input() type: ItemType;

  owner: User;

  hidden: boolean = true;

  private dialogTitle: string = 'Remove video';
  private dialogMessage: string =
    'Video will be removed <strong>permanently</strong>. Are you sure?';

  constructor(
    private userQuery: UserQuery,
    private videoService: VideoService,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.owner = await this.userQuery.getUser(this.video.ownerRef);
  }

  toggleMenu(event: any): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.hidden = !this.hidden;
  }

  openConfirmationDialog(event: any): void {
    this.toggleMenu(event);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      height: '210px',
      data: { title: this.dialogTitle, message: this.dialogMessage },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(async (result) => {
        if (result === 'remove') {
          await this.deleteVideo();
        }
      });
  }

  async deleteVideo(): Promise<void> {
    await this.videoService.deleteVideo(this.video.id);
  }

  get createdDuration(): string {
    return moment(this.video.createdAt).fromNow();
  }

  get showSettings(): boolean {
    return this.type === 'card-settings' && this.owner.id === this.me?.id;
  }
}
