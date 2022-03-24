import { Injectable } from '@angular/core';
// import { algoliaConfig } from '../../environments/environment';
import algoliasearch from 'algoliasearch';
import { Video, SearchVideo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // private client = algoliasearch(
  //   algoliaConfig.app_id,
  //   algoliaConfig.search_key
  // );
  // private index = this.client.initIndex('bibo_search');
  // constructor() {}
  async search(text: string): Promise<Video[]> {
    // const res = await this.index.search(text);
    // return res.hits.map(
    //   (hit) => (hit as unknown) as Omit<SearchVideo, 'objectID'>
    // );

    return [];
  }
}
