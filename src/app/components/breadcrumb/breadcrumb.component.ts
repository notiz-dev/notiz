import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  template: ` <nav class="flex flex-wrap" aria-label="Breadcrumb">
    <div class="flex items-center space-x-2">
      <a
        class="cursor-pointer text-primary hover:text-primary-shade text-2xl"
        [routerLink]="[home.url]"
      >
        <i
          class="material-icons-outlined flex-shrink-0 text-2xl"
          aria-hidden="true"
        >
          home
        </i>
        <span class="sr-only">{{ home.label }}</span>
      </a>

      <div
        class="flex items-center"
        *ngFor="let crumb of crumbs; let last = last"
      >
        <i
          class="material-icons-outlined flex-shrink-0 text-2xl  text-gray-500"
          aria-hidden="true"
        >
          keyboard_arrow_right
        </i>
        <a
          *ngIf="!last"
          [routerLink]="[crumb.url]"
          class="ml-2 text-sm font-medium cursor-pointer text-primary hover:text-primary-shade"
        >
          {{ crumb.label }}
        </a>
        <span
          *ngIf="last"
          class="ml-2 text-sm font-medium text-color-light line-clamp-1"
        >
          {{ crumb.label }}
        </span>
      </div>
    </div>
  </nav>`,
  styles: [],
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() home: Breadcrumb = { label: 'Start', url: '' };
  @Input() data: any;
  crumbs: Breadcrumb[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.crumbs = this.route.pathFromRoot
      .filter((route) => route.routeConfig)
      .filter((route) => route.routeConfig.data?.breadcrumb)
      .map((route) => ({
        url: route.snapshot.pathFromRoot.map((r) => r.url.join('/')).join('/'),
        label: this.getLabel(route.routeConfig.data),
      }));
  }

  private getLabel(data: Data) {
    if (data.breadcrumb instanceof Function) {
      return data.breadcrumb(this.data);
    }
    return data.breadcrumb;
  }
}

export interface Breadcrumb {
  url: string;
  label: string;
}
