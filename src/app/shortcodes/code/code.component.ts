import {
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { fromEvent, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'niz-code',
  templateUrl: 'code.component.html',
  styleUrls: ['code.component.scss'],
})
export class CodeComponent implements OnInit {
  @HostBinding('class') class = 'block overflow-x-hidden';
  shortcodeEl: HTMLElement;
  tabs: string = '';
  _tabs: { name: string; content: string }[] = [];
  @ViewChildren('codeblock') codeblocks: QueryList<TemplateRef<any>>;
  @ViewChild('copyButton') copyButton: ElementRef<HTMLButtonElement>;

  content: TemplateRef<any>;
  index: number = 0;
  copyText = 'content_copy';
  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this._tabs = Array.from(this.shortcodeEl.children).map(
      (el: HTMLPreElement, index: number) => ({
        name: this.tabs.split(',')[index],
        content: el.innerHTML,
      })
    );
    setTimeout(() => {
      this.content = this.codeblocks.get(this.index);
    }, 0);
  }

  updateTab(index: number) {
    this.content = this.codeblocks.get(index);
    this.index = index;
  }

  copy() {
    navigator.clipboard.writeText(
      this.el.nativeElement.querySelector('code')?.innerText
    );
    this.copyText = '🎉';
    timer(4000)
      .pipe(
        tap(() => (this.copyText = 'content_copy')),
        takeUntil(fromEvent(this.copyButton.nativeElement, 'click'))
      )
      .subscribe();
  }
}
