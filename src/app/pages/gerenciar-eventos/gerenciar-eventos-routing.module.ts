import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciarEventosPage } from './gerenciar-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: GerenciarEventosPage
  },
  {
    path: 'meusEventos',
    component: GerenciarEventosPage,
    loadChildren: () => import('../meus-eventos/meus-eventos.module').then( m => m.MeusEventosPageModule)
  },
  {
    path: 'eventosInscritos',
    component: GerenciarEventosPage,
    loadChildren: () => import('../inscrito-eventos/inscrito-eventos.module').then( m => m.InscritoEventosPageModule)
  },
  {
    path: '',
    redirectTo: '/meusEventos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciarEventosPageRoutingModule {}
