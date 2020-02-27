import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  generateTags(config: SeoConfig = {}) {
    config.keywords
      ? (config.keywords = environment.keywords.concat(config.keywords))
      : (config.keywords = environment.keywords);

    // default values
    config = {
      title: environment.title,
      description: environment.description,
      image: environment.featureImage,
      route: '',
      ...config
    };

    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({
      name: 'keywords',
      content: config.keywords.join(', ')
    });

    this.openGraph(config);
    this.twitterCard(config);
  }

  private openGraph(config: SeoConfig) {
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({
      property: 'og:description',
      content: config.description
    });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({
      property: 'og:url',
      content: `${environment.url}${config.route}`
    });
    this.meta.updateTag({
      property: 'og:image',
      content: this.absoluteImageUrl(config.image)
    });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'notiz'
    });
  }

  private twitterCard(config: SeoConfig) {
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@notiz_dev' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: config.description
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: this.absoluteImageUrl(config.image)
    });
  }

  private absoluteImageUrl(image: string) {
    return `${environment.url}/${image}`;
  }
}

export interface SeoConfig {
  title?: string;
  description?: string;
  image?: string;
  route?: string;
  keywords?: string[];
}
