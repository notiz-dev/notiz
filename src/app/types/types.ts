import { ScullyRoute } from '@scullyio/ng-lib';

export interface TagWeight {
  tag: ScullyRoute;
  weight: number;
}

export type SearchItemType = 'tag' | 'blog' | 'series' | 'link';

export interface SearchItem {
  title: string;
  description?: string;
  url: string;
  tag: string;
  type: SearchItemType;
}

export enum ContentType {
  ARTICLE = 'ARTICLE',
  LINK = 'LINK',
}
