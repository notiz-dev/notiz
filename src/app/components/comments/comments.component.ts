import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() route: ScullyRoute;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const script: HTMLScriptElement = this.renderer.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo','notiz-dev/notiz');
    script.setAttribute('issue-term',this.route.title);
    script.setAttribute('theme','preferred-color-scheme');
    script.setAttribute('crossorin','anonymous');
    script.async = true;
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
