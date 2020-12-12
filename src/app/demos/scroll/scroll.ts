import { fromEvent, merge, zip } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export const scrolltop$ = (el: Element) =>
  merge(fromEvent(el, 'scroll'), fromEvent(window, 'scroll')).pipe(
    startWith(el.scrollTop),
    map(() => el.scrollTop)
  );

export const scrollHeight$ = (el: Element) =>
  merge(fromEvent(el, 'scroll'), fromEvent(window, 'scroll')).pipe(
    startWith(el.scrollHeight),
    map(() => el.scrollHeight)
  );

export const scroll$ = (el: Element) =>
  zip(scrolltop$(el), scrollHeight$(el)).pipe(
    map(([top, height]) => (100 * top) / (height - el.clientHeight))
  );
