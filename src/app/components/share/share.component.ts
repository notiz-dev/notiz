import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  @Input() route: ScullyRoute;

  constructor() { }

  ngOnInit(): void {
  }

}
