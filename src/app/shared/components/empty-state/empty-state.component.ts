import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [],
  template: `
    <div class="empty-state">
      <h2 class="empty-state__title">{{ title }}</h2>
      <p class="empty-state__message">{{ message }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
  @Input() title = '';
  @Input() message = '';
}
