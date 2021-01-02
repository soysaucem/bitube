import { UserQuery } from '../user/user.query';
import { IpServiceService } from '../../services/ip-service.service';
import { Injectable } from '@angular/core';
import { CommentStore, CommentState } from './comment.store';
import {
  CollectionConfig,
  CollectionService,
  pathWithParams,
} from 'akita-ng-fire';
import { VideoQuery } from '../video/video.query';
import { createComment, Comment } from '../../models';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'videos/:id/comments', idKey: 'id' })
export class CommentService extends CollectionService<CommentState> {
  constructor(
    store: CommentStore,
    private videoQuery: VideoQuery,
    private ipService: IpServiceService,
    private userQuery: UserQuery
  ) {
    super(store);
  }

  get path() {
    const parentId = this.videoQuery.getActiveId();
    return `videos/${parentId}/comments`;
  }

  async addComment(content: string): Promise<string> {
    const owner = await this.userQuery.getMyAccount();
    const ip = await this.ipService.getIpAdress();
    const comment = createComment({
      content,
      ownerRef: owner ? owner.id : null,
      ip: ip.ip,
    });
    return this.add(comment);
  }

  async removeComment(id: string): Promise<void> {
    return this.remove(id);
  }

  async updateComment(id: string, props: Partial<Comment>): Promise<void> {
    return this.update(id, { ...props });
  }

  get currentPath(): string {
    const id = this.videoQuery.getActiveId();
    return pathWithParams(this.constructor['path'], { id });
  }
}
