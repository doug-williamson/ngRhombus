import { Component, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ISocial, SocialsSource } from '../socials.service';

@Component({
  selector: 'ng-rhombus-socials-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class NgRhombusSocialsListComponent {
  socials = input<ISocial[]>([]);

  // Map source to Material icon names (adjust as desired)
  iconFor(source?: SocialsSource): string {
    switch (source) {
      case SocialsSource.Twitch: return 'sports_esports';
      case SocialsSource.YouTube: return 'ondemand_video';
      case SocialsSource.Instagram: return 'camera_alt';
      case SocialsSource.TikTok: return 'music_note';
      case SocialsSource.Bluesky: return 'cloud';
      default: return 'link';
    }
  }

  openUrl(url?: string) {
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  }
}