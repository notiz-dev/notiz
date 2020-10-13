import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute } from '@scullyio/ng-lib';
import { ScullyContentService } from '@services/scully-content.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  authors$: Observable<ScullyRoute[]>;

  constructor(private scullyContentService: ScullyContentService) {}

  ngOnInit() {
    this.authors$ = this.scullyContentService.authors();
  }
}
