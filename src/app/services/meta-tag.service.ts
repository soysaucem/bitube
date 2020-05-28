import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MetaTag } from '../abstract-components/meta-tag';

@Injectable({
  providedIn: 'root',
})
export class MetaTagService {
  private titleMeta: string = 'og:title';
  private imageMeta: string = 'og:image';

  constructor(private metaService: Meta) {}

  setSocialMediaTags(title: string, image: string): void {
    var tags = [
      new MetaTag(this.titleMeta, title, true),
      new MetaTag(this.imageMeta, image, true),
    ];
    this.setTags(tags);
  }

  private setTags(tags: MetaTag[]): void {
    tags.forEach((siteTag) => {
      const tag = siteTag.isFacebook
        ? this.metaService.getTag(`property='${siteTag.name}'`)
        : this.metaService.getTag(`name='${siteTag.name}'`);
      if (siteTag.isFacebook) {
        this.metaService.updateTag({
          property: siteTag.name,
          content: siteTag.value,
        });
      } else {
        this.metaService.updateTag({
          name: siteTag.name,
          content: siteTag.value,
        });
      }
    });
  }
}
