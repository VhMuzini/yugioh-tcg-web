import { Component, Input } from '@angular/core';
import { ScarabIconComponent } from '../scarab-icon/scarab-icon.component';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [ScarabIconComponent],
  template: `
    <div class="loading-state" role="status" aria-live="polite">
      <app-scarab-icon class="loading-state__icon" [size]="32" />
      <p class="loading-state__message">{{ message }}</p>
    </div>
  `,
  styleUrl: './loading-state.component.scss',
})
export class LoadingStateComponent {
  @Input() message = 'Loading…';
}
