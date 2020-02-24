import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { SeoService } from '@services/seo.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  author$: Observable<ScullyRoute>;

  constructor(private scully: ScullyRoutesService, private seo: SeoService) {}

  ngOnInit(): void {
    this.author$ = this.scully.getCurrent();
    this.seo.generateTags();
  }
}
