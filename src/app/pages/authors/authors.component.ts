import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { SeoService } from '@services/seo.service';
import { ScullyContentService } from '@services/scully-content.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors$: Observable<ScullyRoute[]>;

  constructor(
    private scullyContentService: ScullyContentService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.authors$ = this.scullyContentService.authors();
    this.seo.generateTags({ title: 'Authors' });
  }
}
