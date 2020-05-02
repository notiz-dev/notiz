import { Component, OnInit } from '@angular/core';
import { Tab, FooterSection } from '@notiz/ngx-design';
import { ThemeService } from '@services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tabs: Tab[] = [
    {
      url: '/',
      text: 'notiz',
      logo: true,
      image: 'assets/img/notiz.svg',
      routeActive: false
    },
    // {
    //   url: '/search/',
    //   image: 'assets/img/search.svg',
    //   routeActive: true,
    // },
    {
      url: '/blog/',
      image: 'assets/img/blog.svg',
      routeActive: true
    },
    // {
    //   url: '/links/',
    //   image: 'assets/img/links.svg',
    //   routeActive: true,
    // },
    {
      url: '/tags/',
      image: 'assets/img/tags.svg',
      routeActive: true
    }
  ];

  themeTab: Tab = {
    image: 'assets/img/adjust.svg'
  };

  copyrightUrl = 'legal/privacy-policy';

  createdWithSvgSources = [
    'assets/stack/angular.svg',
    'assets/stack/scully.svg',
    'assets/stack/tailwindcss.svg',
    'assets/stack/firebase.svg'
  ];

  footerSections: FooterSection[] = [
    {
      title: 'notiz.dev',
      links: [
        {
          title: '@notiz_dev',
          url: 'https://twitter.com/notiz_dev',
          svg: 'assets/img/twitter-white.svg',
          external: true
        },
        {
          title: ' @notiz-dev',
          url: 'https://github.com/notiz-dev',
          svg: 'assets/img/github-white.svg',
          external: true
        },
        {
          title: 'hi@notiz.dev',
          url: 'mailto:hi@notiz.dev',
          svg: 'assets/img/mail.svg',
          external: true
        }
      ]
    },
    {
      title: 'more',
      links: [
        {
          title: 'all posts',
          url: '/blog/',
          svg: 'assets/img/blog-white.svg'
        },
        {
          title: 'authors',
          url: '/authors/',
          svg: 'assets/img/author.svg'
        },
        {
          title: 'tags',
          url: '/tags/',
          svg: 'assets/img/tags-white.svg'
        }
      ]
    }
  ];

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    const notiz =
      "##::: ##::'#######::'########:'####:'########:\n" +
      "###:: ##:'##.... ##:... ##..::. ##::..... ##::\n" +
      '####: ##: ##:::: ##:::: ##::::: ##:::::: ##:::\n' +
      '## ## ##: ##:::: ##:::: ##::::: ##::::: ##::::\n' +
      '##. ####: ##:::: ##:::: ##::::: ##:::: ##:::::\n' +
      '##:. ###: ##:::: ##:::: ##::::: ##::: ##::::::\n' +
      "##::. ##:. #######::::: ##::::'####: ########:\n";

    console.log(
      `${notiz} \n\n* notiz [noˈtiːt͡s] - (german) short, brief, written record \n\nInterested in our source code? It is available on GitHub https://github.com/notiz-dev/notiz ⭐. Created with Angular and Scully, hosted on Firebase.`
    );

    this.themeService.initTheme();
  }
}
