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
  private platformId = inject(PLATFORM_ID);
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
    if (isPlatformBrowser(this.platformId)) {
      this.appTheme.set(theme);

      const colorScheme = theme === 'system' ? 'light dark' : theme;
      document.body.style.setProperty('color-scheme', colorScheme);

      this.setThemeInLocalStorage(theme);
    }
  }

  setThemeInLocalStorage(theme: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.PREFERRED_THEME_COOKIE, theme);
    }
  }

  getThemeFromLocalStorage() {
    if (!isPlatformBrowser(this.platformId)) return 'system';
    return localStorage.getItem(this.PREFERRED_THEME_COOKIE) ?? 'system';
  }

  constructor() {
    this.setTheme(this.getThemeFromLocalStorage());
  }
}
