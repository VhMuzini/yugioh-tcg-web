import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scarab-icon',
  standalone: true,
  imports: [],
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="24" cy="27" rx="12" ry="9" fill="currentColor" />
      <circle cx="24" cy="14" r="6" fill="currentColor" />
      <path d="M24 8 L24 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M19 6 L15 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M29 6 L33 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M12 24 L4 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M12 29 L3 29" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M12 34 L4 38" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M36 24 L44 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M36 29 L45 29" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M36 34 L44 38" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M24 36 Q24 44 24 46" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
})
export class ScarabIconComponent {
  @Input() size = 24;
}
