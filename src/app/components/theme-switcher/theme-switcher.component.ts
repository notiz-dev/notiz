import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
  _theme: 'dark' | 'light' = 'dark';
  @Input() set theme(theme: 'dark' | 'light') {
    this._theme = theme;

    document.body.classList.toggle('dark', this._theme === 'dark');

    if (window.localStorage) {
      window.localStorage.setItem(
        'theme',
        document.body.classList.contains('dark') ? 'dark' : 'light'
      );
    }
  }

  get theme() {
    return this._theme;
  }

  constructor() {}

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const storedTheme =
      window.localStorage && window.localStorage.getItem('theme');

    prefersDark.addListener(mediaQuery => {
      if (
        (mediaQuery.matches && this.theme === 'light') ||
        (!mediaQuery.matches && this.theme === 'dark')
      ) {
        this.changeTheme();
      }
    });

    this.theme =
      storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : prefersDark
        ? 'dark'
        : 'light';
  }

  changeTheme() {
    if (this._theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }
  }
}
