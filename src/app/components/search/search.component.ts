import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { VideoQuery } from '../../services/video/state/video.query';
import { ComponentWithSubscription } from '../../helper-components/component-with-subscription/component-with-subscription';
import { List } from 'immutable';
import { Video } from '../../services/video/state/video.model';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent extends ComponentWithSubscription
  implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;

  searchText$ = new Subject<string>();
  results: List<Video>;
  loading = false;

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.search();
  }

  handleSearchInput(event: any): void {
    this.loading = true;
    this.searchText$.next(event.target.value);
  }

  clearSearch(): void {
    this.searchText$.next('');
    (this.searchInput.nativeElement as HTMLInputElement).value = '';
  }

  search() {
    this.autoUnsubscribe(this.searchText$)
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe(async text => {
        try {
          if (text) {
            this.results = await this.searchService.search(text.toLowerCase());
          } else {
            this.results = List();
          }
        } catch (err) {
          console.error('Failed to search videos!');
          console.error(err);
        }
        this.loading = false;
      });
  }
}
