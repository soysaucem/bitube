import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BUCKET_URL } from '../../util/variables';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import * as moment from 'moment';

type Opinion = 'like' | 'dislike';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WatchVideoComponent implements OnInit {
  bucketUrl = BUCKET_URL;
  videoId: string;
  video: Video;
  owner: User;
  me: User;
  likeRatio: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.videoId = this.activatedRoute.snapshot.paramMap.get('id');
    this.video = await this.videoService.getVideo(this.videoId);
    this.owner = await this.userService.getUser(this.video.ownerId);
    this.me = await this.userService.getMyAccount();
    this.likeRatio =
      this.video.likes.size /
      (this.video.likes.size + this.video.dislikes.size);
  }

  async updateOpinion(type: Opinion) {
    if (type === 'like' && !this.isLiked()) {
      const likes = this.video.likes.push(this.me.id).toArray();
      let dislikes = this.video.dislikes.toArray();

      // Remove dislike on like
      if (dislikes.includes(this.me.id)) {
        dislikes = dislikes.filter(dislike => dislike !== this.me.id);
      }

      await this.videoService.update(this.videoId, { likes, dislikes });
    } else if (type === 'dislike' && !this.isDisliked()) {
      const dislikes = this.video.dislikes.push(this.me.id).toArray();
      let likes = this.video.likes.toArray();

      // Remove like on dislike
      if (likes.includes(this.me.id)) {
        likes = likes.filter(like => like !== this.me.id);
      }

      await this.videoService.update(this.videoId, { likes, dislikes });
    }
  }

  isLiked() {
    return this.video.likes.includes(this.me.id) ? true : false;
  }

  isDisliked() {
    return this.video.dislikes.includes(this.me.id) ? true : false;
  }

  get description() {
    return this.video.description
      ? this.video.description
      : 'There is no description for this video';
  }

  get publishedDate() {
    const date = moment(this.video.createdAt);
    return date.format('DD MMM YYYY');
  }
}
