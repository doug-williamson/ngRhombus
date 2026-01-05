import { Component, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin, faYoutube, faInstagram, faTwitch, faTiktok, faBluesky } from '@fortawesome/free-brands-svg-icons';
import { faCloud, faLink } from '@fortawesome/free-solid-svg-icons';
import { ISocial, SocialsSource } from '../socials.service';

@Component({
  selector: 'ng-rhombus-socials-list',
  standalone: true,
  imports: [FontAwesomeModule, MatToolbarModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class NgRhombusSocialsListComponent {
  socials = input<ISocial[]>([]);

  iconFor(source?: SocialsSource): IconDefinition {
    switch (source) {
      case SocialsSource.YouTube: return faYoutube;
      case SocialsSource.Instagram: return faInstagram;
      case SocialsSource.Twitch: return faTwitch;
      case SocialsSource.TikTok: return faTiktok;
      case SocialsSource.Bluesky: return faBluesky; // no official brand, fallback
      default: return faLink;
    }
  }

  openUrl(url?: string) {
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  }
}