import { Directive, ElementRef, Input, Output } from '@angular/core';
import { intersection$ } from '@utils/intersection';
import { filter, map, take, throttleTime } from 'rxjs/operators';

@Directive({ selector: '[intersection]' })
export class IntersectionDirective {
  @Output() intersects = intersection$(this.el.nativeElement, {}).pipe(
    filter(() => !this.disabled),
    map((entry) => entry.isIntersecting),
    filter((isIntersecting) => isIntersecting),
    throttleTime(20),
  );
  @Output() leave = intersection$(this.el.nativeElement, {}).pipe(
    filter(() => !this.disabled),
    map((entry) => entry.isIntersecting),
    filter((isIntersecting) => !isIntersecting),
    throttleTime(20)
  );
  @Input() disabled = false;
  constructor(private el: ElementRef<HTMLElement>) {}
}
