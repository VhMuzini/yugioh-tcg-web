import { Component } from '@angular/core';
import { ScarabIconComponent } from '../scarab-icon/scarab-icon.component';

@Component({
  selector: 'app-page-frame',
  standalone: true,
  imports: [ScarabIconComponent],
  template: `
    <div class="page-frame">
      <app-scarab-icon class="ornament ornament--tl" [size]="20" />
      <app-scarab-icon class="ornament ornament--tr" [size]="20" />
      <app-scarab-icon class="ornament ornament--bl" [size]="20" />
      <app-scarab-icon class="ornament ornament--br" [size]="20" />
      <div class="page-frame__content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './page-frame.component.scss',
})
export class PageFrameComponent {}
