import { Component } from '@angular/core';
import { ScarabIconComponent } from '../scarab-icon/scarab-icon.component';

@Component({
  selector: 'app-section-divider',
  standalone: true,
  imports: [ScarabIconComponent],
  template: `
    <div class="section-divider" role="presentation">
      <span class="section-divider__line"></span>
      <app-scarab-icon [size]="16" />
      <span class="section-divider__line"></span>
    </div>
  `,
  styleUrl: './section-divider.component.scss',
})
export class SectionDividerComponent {}
