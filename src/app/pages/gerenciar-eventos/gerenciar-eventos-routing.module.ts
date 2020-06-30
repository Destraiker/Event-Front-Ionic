import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciarEventosPage } from './gerenciar-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: GerenciarEventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciarEventosPageRoutingModule {}
