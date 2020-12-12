import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { scrollPercent$ } from './scroll';

@Pipe({
  name: 'scroll',
  pure: true,
})
export class ScrollPipe implements PipeTransform {
  transform(el: HTMLElement): Observable<number> {
    return scrollPercent$(el);
  }
}
