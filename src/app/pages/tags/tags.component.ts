import { Component } from '@angular/core';
import { ScullyContentService } from '@services/scully-content.service';
import { Observable } from 'rxjs';
import { ScullyRoute } from '@scullyio/ng-lib';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  tags$: Observable<ScullyRoute[]> = this.scullyContent.tags();

  constructor(private scullyContent: ScullyContentService) {}
}
