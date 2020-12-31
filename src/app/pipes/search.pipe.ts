import { ScullyRoute } from '@scullyio/ng-lib';
import { Pipe, PipeTransform } from '@angular/core';
import { SearchItem, SearchItemType } from '../types/types';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(routes: ScullyRoute[], search: string): SearchItem[] {
    if (!routes || !search) {
      return [];
    }
    return routes
      .filter(
        (route) =>
          route.route.startsWith('/blog/') ||
          route.route.startsWith('/links/') ||
          route.route.startsWith('/tags/') ||
          route.route.startsWith('/series/')
      )
      .filter((route) =>
        this.hasRoutesIncludingSearch(route, search.toLocaleLowerCase())
      )
      .map((route) =>
        route.route.startsWith('/tags/')
          ? this.mapTagRouteToSearchItem(route)
          : this.mapScullyRouteToSearchItem(route)
      );
  }

  private hasRoutesIncludingSearch(
    route: ScullyRoute,
    search: string
  ): boolean {
    return (
      route.title.toLocaleLowerCase().includes(search) ||
      route?.description?.toLocaleLowerCase().includes(search)
    );
  }

  private mapScullyRouteToSearchItem(route: ScullyRoute): SearchItem {
    return {
      title: route.title,
      description: route.description,
      url: route.route,
      tag: route.tags[0].toLowerCase(),
      type: this.mapScullyRouteToType(route),
    };
  }

  private mapTagRouteToSearchItem(route: ScullyRoute): SearchItem {
    return {
      title: route.title,
      url: route.route,
      tag: route.slug,
      type: 'tag',
    };
  }

  private mapScullyRouteToType(route: ScullyRoute): SearchItemType {
    if (route.route.startsWith('/blog/')) {
      return 'blog';
    } else if (route.route.startsWith('/links/')) {
      return 'link';
    } else if (route.route.startsWith('/tags/')) {
      return 'tag';
    } else if (route.route.startsWith('/series/')) {
      return 'series';
    }
    return null;
  }
}
