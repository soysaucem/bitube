import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';
import { ComponentWithSubscription } from '../../helper-components/component-with-subscription/component-with-subscription';
import { User } from '../../services/user/state/user.model';
import { UserQuery } from '../../services/user/state/user.query';
import {
  fromJS,
  Video,
  VideoJSON,
} from '../../services/video/state/video.model';
import { VideoService } from '../../services/video/state/video.service';
import { BUCKET_URL } from '../../util/variables';
import { generateS3Link } from '../../util/s3-link-generator';

type Opinion = 'like' | 'dislike';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WatchVideoComponent extends ComponentWithSubscription
  implements OnInit {
  bucketUrl = BUCKET_URL;
  videoId: string;
  video: Video;
  owner: User;
  me: User;
  likeRatio: number;
  link: any;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private userQuery: UserQuery
  ) {
    super();
  }

  ngOnInit() {
    this.autoUnsubscribe(
      this.route.params.pipe(
        switchMap(({ id }) => this.videoService.syncDoc({ id }))
      )
    ).subscribe(async (video: VideoJSON) => {
      const fromJSVideo = fromJS(video);
      this.videoId = fromJSVideo.id;
      this.video = fromJSVideo;

      this.link = await generateS3Link(this.videoId);

      this.owner = await this.userQuery.getUser(this.video.ownerId);
      this.me = await this.userQuery.getMyAccount();
      this.likeRatio =
        this.video.likes.size /
        (this.video.likes.size + this.video.dislikes.size);
    });
  }

  async updateOpinion(type: Opinion) {
    if (!this.me) {
      return;
    }

    if (type === 'like' && !this.isLiked()) {
      const likes = this.video.likes.push(this.me.id);
      let dislikes = this.video.dislikes;

      // Remove dislike on like
      if (dislikes.includes(this.me.id)) {
        dislikes = dislikes.filter(dislike => dislike !== this.me.id);
      }

      await this.videoService.updateVideo(this.videoId, {
        likes: likes.toArray(),
        dislikes: dislikes.toArray(),
      });
    } else if (type === 'dislike' && !this.isDisliked()) {
      const dislikes = this.video.dislikes.push(this.me.id);
      let likes = this.video.likes;

      // Remove like on dislike
      if (likes.includes(this.me.id)) {
        likes = likes.filter(like => like !== this.me.id);
      }

      await this.videoService.updateVideo(this.videoId, {
        likes: likes.toArray(),
        dislikes: dislikes.toArray(),
      });
    }
  }

  isLiked() {
    return this.video.likes.includes(this.me?.id) ? true : false;
  }

  isDisliked() {
    return this.video.dislikes.includes(this.me?.id) ? true : false;
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
