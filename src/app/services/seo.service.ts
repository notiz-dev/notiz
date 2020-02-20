import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  generateTags(config: SeoConfig = {}) {
    // default values
    config = {
      title: "notiz",
      description:
        "personal site and blog of notiz - full stack developer",
      image: "https://avatars1.githubusercontent.com/u/8986373?s=460&v=4",
      slug: "",
      ...config
    };

    this.title.setTitle(config.title);
    this.meta.updateTag({ name: "description", content: config.description });
    this.meta.updateTag({ name: "twitter:card", content: "summary" });
    this.meta.updateTag({ name: "twitter:site", content: "@notiz" });
    this.meta.updateTag({ name: "twitter:title", content: config.title });
    this.meta.updateTag({
      name: "twitter:description",
      content: config.description
    });
    this.meta.updateTag({ name: "twitter:image", content: config.image });

    this.meta.updateTag({ property: "og:type", content: "article" });
    this.meta.updateTag({
      property: "og:site_name",
      content: "notiz"
    });
    this.meta.updateTag({ property: "og:title", content: config.title });
    this.meta.updateTag({
      property: "og:description",
      content: config.description
    });
    this.meta.updateTag({ property: "og:image", content: config.image });
    this.meta.updateTag({
      property: "og:url",
      content: `https://notiz.de/${config.slug}`
    });
  }
}

export interface SeoConfig {
  title?: string;
  description?: string;
  image?: string;
  slug?: string;
}
