import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { SeoArticle, SeoProfile, SeoService } from '@services/seo.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'niz-seo',
  template: ``,
})
export class SeoComponent implements OnInit, OnChanges {
  @Input() title: string = environment.title;
  @Input() description: string = environment.description;
  @Input() tags: string[] = [];
  @Input() keywords: string[] = [];
  @Input() route: string = this.router.url;
  @Input() image: string = this.absoluteImageUrl(environment.featureImage);
  @Input() twitterImage: string;
  @Input() ogImage: string;
  @Input() robots = 'index, follow';

  // author
  @Input() authorFirstName: string;
  @Input() authorLastName: string;
  @Input() authorUserName: string;

  // article
  @Input() articlePublishedAt: string;
  @Input() articleUpdatedAt: string;
  @Input() articleAuthors: string[];

  constructor(private seoService: SeoService, private router: Router) {}

  ngOnInit(): void {
    this.updateMetaTags();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateMetaTags();
  }

  updateMetaTags() {
    this.seoService.generateMetaTags({
      title: this.title,
      description: this.description,
      route: this.route,
      keywords: this.keywords ? [...this.tags, ...this.keywords] : this.tags,
      image: this.image,
      twitter_image: this.twitterImage
        ? this.getTwitterImage(this.twitterImage)
        : null,
      og_image: this.ogImage ? this.getOgImage(this.ogImage) : null,
      robots: this.robots,
      article: this.getArticle(),
      author: this.getAuthor(),
    });
  }

  private getArticle(): SeoArticle | null {
    if (
      this.articlePublishedAt &&
      this.articleUpdatedAt &&
      this.articleAuthors
    ) {
      return {
        published_time: this.articlePublishedAt,
        modified_time: this.articleUpdatedAt,
        tag: this.tags,
        author: this.articleAuthors,
      };
    }
    return null;
  }
  private getAuthor(): SeoProfile | null {
    if (this.authorFirstName && this.authorLastName && this.authorUserName) {
      return {
        first_name: this.authorFirstName,
        last_name: this.authorLastName,
        username: this.authorUserName,
      };
    }
    return null;
  }

  private getTwitterImage(twitterImageRoute: string) {
    return `https://notiz.dev/assets/banners${twitterImageRoute}/twitter.png`;
  }

  private getOgImage(ogRoute: string) {
    return `https://notiz.dev/assets/banners${ogRoute}/og.png`;
  }

  private absoluteImageUrl(image: string) {
    return `${environment.url}/${image}`;
  }
}
