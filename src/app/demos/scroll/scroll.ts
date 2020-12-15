import { fromEvent, merge, zip } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  startWith,
} from 'rxjs/operators';

export const pageScroll$ = () =>
  fromEvent(window, 'scroll').pipe(
    map(() => document.documentElement.scrollTop)
  );

export const scrolltop$ = (el: Element) =>
  merge(fromEvent(el, 'scroll')).pipe(
    startWith(el.scrollTop),
    map(() => el.scrollTop)
  );

export const scrollHeight$ = (el: Element) =>
  merge(fromEvent(el, 'scroll')).pipe(
    startWith(el.scrollHeight),
    map(() => el.scrollHeight)
  );

export const scrollPercent$ = (el: Element) =>
  zip(scrolltop$(el), scrollHeight$(el)).pipe(
    filter(([top, height]) => height - el.clientHeight !== 0),
    map(([top, height]) => (100 * top) / (height - el.clientHeight)),
    startWith(0)
  );

export const scrolldir$ = (el: Element) =>
  scrolltop$(el).pipe(
    pairwise(),
    map(([v1, v2]) => (v1 > v2 ? 'UP' : 'DOWN')),
    distinctUntilChanged()
  );
