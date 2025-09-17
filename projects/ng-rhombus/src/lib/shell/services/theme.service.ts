import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';

export interface AppTheme {
  name: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private appTheme = signal<string>('system');
  private readonly PREFERRED_THEME_COOKIE = 'preferred-theme';

  private themes: AppTheme[] = [
    { name: 'light', icon: 'light_mode' },
    { name: 'dark', icon: 'dark_mode' },
    { name: 'system', icon: 'desktop_windows' },
  ];

  selectedTheme = computed(() =>
    this.themes.find((t) => t.name === this.appTheme())
  );

  getThemes() {
    return this.themes;
  }

  setTheme(theme: string) {
    this.appTheme.set(theme);

    const colorScheme = theme === 'system' ? 'light dark' : theme;
    document.body.style.setProperty('color-scheme', colorScheme);

    this.setThemeInLocalStorage(theme);
  }

  setThemeInLocalStorage(theme: string) {
    localStorage.setItem(this.PREFERRED_THEME_COOKIE, theme);
  }

  getThemeFromLocalStorage() {
    return localStorage.getItem(this.PREFERRED_THEME_COOKIE) as string;
  }

  constructor() {
    this.setTheme(this.getThemeFromLocalStorage());
  }
}
