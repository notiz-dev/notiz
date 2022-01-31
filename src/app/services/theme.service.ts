import { PlausibleEvent } from './../types/types';
import { PlausibleService } from '@notiz/ngx-plausible';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  _theme: Theme = 'dark';
  themeChange = new BehaviorSubject<Theme>(this._theme);
  set theme(theme: Theme) {
    this._theme = theme;
    this.themeChange.next(theme);

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

  constructor(private plausible: PlausibleService) {}

  initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const storedTheme =
      window.localStorage && window.localStorage.getItem('theme');

    prefersDark.addEventListener('change', (mediaQuery) => {
      if (
        (mediaQuery.matches && this.theme === 'light') ||
        (!mediaQuery.matches && this.theme === 'dark')
      ) {
        this.toggleTheme();
      }
    });

    this.theme =
      storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : prefersDark
        ? 'dark'
        : 'light';
  }

  toggleTheme(trigger: 'click' | 'shortcut' = 'click') {
    if (this._theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }

    this.plausible.event(PlausibleEvent.Theme, {
      props: { theme: this.theme, trigger: trigger },
    });
  }
}
