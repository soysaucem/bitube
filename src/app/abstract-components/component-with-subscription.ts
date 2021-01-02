import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  template: '',
})
export class ComponentWithSubscription implements OnDestroy {
  readonly complete$ = new Subject();

  ngOnDestroy() {
    this.complete$.next();
    this.complete$.complete();
  }

  autoUnsubscribe<T>(observable: Observable<T>) {
    return observable.pipe(takeUntil(this.complete$));
  }
}
