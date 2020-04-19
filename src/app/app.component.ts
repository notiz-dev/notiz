import { Component, OnInit } from '@angular/core';
import { Tab } from '@notiz/ngx-design';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tabs: Tab[] = [
    {
      url: '/',
      image: 'assets/img/notiz.svg',
      routeActive: false,
    },
    // {
    //   url: '/search/',
    //   image: 'assets/img/search.svg',
    //   routeActive: true,
    // },
    {
      url: '/blog/',
      image: 'assets/img/blog.svg',
      routeActive: true,
    },
    // {
    //   url: '/links/',
    //   image: 'assets/img/links.svg',
    //   routeActive: true,
    // },
    {
      url: '/tags/',
      image: 'assets/img/tags.svg',
      routeActive: true,
    }
  ];

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
  }
}
