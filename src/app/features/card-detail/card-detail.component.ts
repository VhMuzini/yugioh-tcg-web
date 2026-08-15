import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardService } from '../../core/services/card.service';
import type { Card } from '../../core/models/card.model';
import { PageFrameComponent } from '../../shared/components/page-frame/page-frame.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [RouterLink, PageFrameComponent, LoadingStateComponent, EmptyStateComponent],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss',
})
export class CardDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly cardService = inject(CardService);

  readonly card = signal<Card | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('No card was specified.');
      this.loading.set(false);
      return;
    }

    this.fetchCard(id);
  }

  private fetchCard(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.cardService.getById(id).subscribe({
      next: (card) => {
        this.card.set(card);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(
          err?.status === 404
            ? 'This card does not exist in the codex.'
            : 'Could not open this page of the codex. Try again.',
        );
        this.loading.set(false);
      },
    });
  }
}
