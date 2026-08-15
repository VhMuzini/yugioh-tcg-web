import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardService } from '../../core/services/card.service';
import type { CardSummary } from '../../core/models/card.model';
import { PageFrameComponent } from '../../shared/components/page-frame/page-frame.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

const PAGE_SIZE = 24;

@Component({
  selector: 'app-card-index',
  standalone: true,
  imports: [FormsModule, RouterLink, PageFrameComponent, LoadingStateComponent, EmptyStateComponent],
  templateUrl: './card-index.component.html',
  styleUrl: './card-index.component.scss',
})
export class CardIndexComponent implements OnInit {
  private readonly cardService = inject(CardService);

  readonly pageSize = PAGE_SIZE;

  readonly searchTerm = signal('');
  readonly cards = signal<CardSummary[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly offset = signal(0);
  readonly isLastPage = signal(false);

  ngOnInit(): void {
    this.runSearch();
  }

  onSearchSubmit(): void {
    this.offset.set(0);
    this.runSearch();
  }

  next(): void {
    this.offset.set(this.offset() + this.pageSize);
    this.runSearch();
  }

  prev(): void {
    this.offset.set(Math.max(0, this.offset() - this.pageSize));
    this.runSearch();
  }

  private runSearch(): void {
    this.loading.set(true);
    this.error.set(null);

    const term = this.searchTerm().trim();

    this.cardService
      .search({
        fname: term || undefined,
        num: this.pageSize,
        offset: this.offset(),
      })
      .subscribe({
        next: (response) => {
          this.cards.set(response.data);
          this.isLastPage.set(response.data.length < this.pageSize);
          this.loading.set(false);
        },
        error: (err) => {
          if (err?.status === 404) {
            this.cards.set([]);
            this.isLastPage.set(true);
            this.loading.set(false);
            return;
          }
          this.error.set('Could not reach the archive. Try again in a moment.');
          this.loading.set(false);
        },
      });
  }
}
