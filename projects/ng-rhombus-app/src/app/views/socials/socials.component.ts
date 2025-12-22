import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { NgRhombusSocialsListComponent, NgRhombusSocialsService } from '../../../../../ng-rhombus/src/lib/socials/public-api';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'ng-rhombus-app-socials',
  standalone: true,
  imports: [NgRhombusSocialsListComponent],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss'
})
export class NgRhombusAppSocialsComponent implements OnInit {
  socialsService = inject(NgRhombusSocialsService);
  private meta = inject(Meta);
  private title = inject(Title);
  private document = inject(DOCUMENT);
  private platform = inject(Platform);

  async ngOnInit(): Promise<void> {
    // Basic SEO
    this.title.setTitle('Socials • NgRhombus');
    this.meta.updateTag({ name: 'description', content: 'Explore social links and profiles powered by NgRhombus.' });
    this.meta.updateTag({ property: 'og:title', content: 'Socials • NgRhombus' });
    this.meta.updateTag({ property: 'og:description', content: 'Explore social links and profiles powered by NgRhombus.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });

    // Optional canonical
    const href = this.document.location.href;
    let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = href;

    await this.socialsService.fetchAll();
  }

  // Avoid opening a new browser window on mobile
  @HostListener('click', ['$event'])
  handleLinkClick(event: Event) {
    if (!(this.platform.IOS || this.platform.ANDROID)) return;

    const target = event.target as Element | null;
    const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!anchor) return;

    const href = anchor.getAttribute('href') || '';
    const isExternal = /^https?:\/\//i.test(href);
    if (!isExternal) return; // let router links work normally

    event.preventDefault();
    window.location.assign(href); // navigate in the same tab/webview
  }
}