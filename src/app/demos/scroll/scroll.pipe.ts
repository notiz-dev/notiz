import { Pipe, PipeTransform } from "@angular/core";
import { Observable } from "rxjs";
import { scroll$ } from "./scroll";

@Pipe({
  name: "scroll",
  pure: true,
})
export class ScrollPipe implements PipeTransform {
  transform(el: HTMLElement): Observable<number> {
    return scroll$(el);
  }
}
