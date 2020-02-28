import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-github-url',
  templateUrl: './github-url.component.html',
  styleUrls: ['./github-url.component.scss']
})
export class GithubUrlComponent implements OnInit {
  @Input() url: string;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('click')
  click() {
    window.open(this.url, '_blank');
  }
}
