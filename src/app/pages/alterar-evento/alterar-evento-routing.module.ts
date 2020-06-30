import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarEventoPage } from './alterar-evento.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarEventoPageRoutingModule {}
