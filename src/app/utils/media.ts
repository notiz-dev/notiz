import { fromEvent } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export const media$ = (query: string) => {
  return fromEvent(window.matchMedia(query), 'change').pipe(
    startWith(window.matchMedia(query)),
    map((list: MediaQueryList) => list.matches)
  );
};
