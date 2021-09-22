import { Observable, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

export const intersection$ = (
  element: HTMLElement,
  config: IntersectionObserverInit,
  debounce = 0
) =>
  new Observable<IntersectionObserverEntry>((subscriber) => {
    const subject$ = new Subject<{
      entry: IntersectionObserverEntry;
      observer: IntersectionObserver;
    }>();

    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          subject$.next({ entry, observer });
        });
      },
      config
    );

    subject$.subscribe(({ entry }) => {
      subscriber.next(entry);
    });

    subject$
      .pipe(debounceTime(debounce))
      .subscribe(async ({ entry, observer }) => {
        subscriber.next(entry);
      });

    intersectionObserver.observe(element);

    return {
      unsubscribe() {
        intersectionObserver.disconnect();
        subject$.unsubscribe();
      },
    };
  });
