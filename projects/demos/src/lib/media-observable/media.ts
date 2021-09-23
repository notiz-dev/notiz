import { fromEventPattern, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export function media(query: string): Observable<boolean> {
  const mediaQuery = window.matchMedia(query);
  return fromEventPattern(
    mediaQuery.addListener,
    mediaQuery.removeListener
  ).pipe(
    startWith(mediaQuery),
    map((list: MediaQueryList) => list.matches)
  );
}
