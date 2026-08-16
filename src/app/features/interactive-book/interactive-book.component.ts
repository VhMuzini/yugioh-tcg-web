import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CardService } from '../../core/services/card.service';
import type { Card, CardSummary } from '../../core/models/card.model';
import { ScarabIconComponent } from '../../shared/components/scarab-icon/scarab-icon.component';

const TOME_SIZE = 12;
const FLIP_MS = 700;

@Component({
  selector: 'app-interactive-book',
  standalone: true,
  imports: [ScarabIconComponent],
  templateUrl: './interactive-book.component.html',
  styleUrl: './interactive-book.component.scss',
})
export class InteractiveBookComponent implements OnInit {
  private readonly cardService = inject(CardService);

  readonly pages = signal<CardSummary[]>([]);
  readonly pageIndex = signal(0);
  readonly isOpen = signal(false);
  readonly flipDirection = signal<'next' | 'prev' | null>(null);
  readonly detailCache = signal<Map<number, Card>>(new Map());
  readonly loadingList = signal(true);
  readonly errorList = signal<string | null>(null);

  readonly currentSummary = computed<CardSummary | null>(() => this.pages()[this.pageIndex()] ?? null);
  readonly currentCard = computed<Card | null>(() => {
    const summary = this.currentSummary();
    return summary ? (this.detailCache().get(summary.id) ?? null) : null;
  });
  readonly hasPrev = computed(() => this.pageIndex() > 0);
  readonly hasNext = computed(() => this.pageIndex() < this.pages().length - 1);

  ngOnInit(): void {
    this.cardService.search({ num: TOME_SIZE, offset: 0 }).subscribe({
      next: (response) => {
        this.pages.set(response.data);
        this.loadingList.set(false);
        this.prefetch(0);
        this.prefetch(1);
      },
      error: () => {
        this.errorList.set('The tome could not be retrieved from the archive.');
        this.loadingList.set(false);
      },
    });
  }

  open(): void {
    if (this.pages().length === 0) return;
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    this.pageIndex.set(0);
  }

  next(): void {
    if (this.flipDirection() || !this.hasNext()) return;
    this.flipDirection.set('next');
    this.prefetch(this.pageIndex() + 1);

    setTimeout(() => {
      this.pageIndex.update((i) => i + 1);
      this.prefetch(this.pageIndex() + 1);
    }, FLIP_MS / 2);

    setTimeout(() => this.flipDirection.set(null), FLIP_MS);
  }

  prev(): void {
    if (this.flipDirection() || !this.hasPrev()) return;
    this.flipDirection.set('prev');

    setTimeout(() => {
      this.pageIndex.update((i) => i - 1);
    }, FLIP_MS / 2);

    setTimeout(() => this.flipDirection.set(null), FLIP_MS);
  }

  private prefetch(index: number): void {
    const summary = this.pages()[index];
    if (!summary || this.detailCache().has(summary.id)) return;

    this.cardService.getById(summary.id).subscribe((card) => {
      const next = new Map(this.detailCache());
      next.set(summary.id, card);
      this.detailCache.set(next);
    });
  }
}
