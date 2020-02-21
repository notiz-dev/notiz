import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  links$: Observable<ScullyRoute[]> = this.scully.available$;

  constructor(private scully: ScullyRoutesService, private seo: SeoService) {}

  ngOnInit() {
    this.seo.generateTags({ title: 'Blog overview' });
  }
}
