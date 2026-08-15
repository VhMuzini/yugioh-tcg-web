import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/card-index/card-index.component').then((m) => m.CardIndexComponent),
  },
  {
    path: 'cards/:id',
    loadComponent: () =>
      import('./features/card-detail/card-detail.component').then((m) => m.CardDetailComponent),
  },
  { path: '**', redirectTo: '' },
];
