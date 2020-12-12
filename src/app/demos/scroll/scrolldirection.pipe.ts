import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { scrolldir$ } from './scroll';

@Pipe({
  name: 'scrolldir',
  pure: true,
})
export class ScrollDirectionPipe implements PipeTransform {
  transform(el: HTMLElement): Observable<string> {
    return scrolldir$(el);
  }
}
