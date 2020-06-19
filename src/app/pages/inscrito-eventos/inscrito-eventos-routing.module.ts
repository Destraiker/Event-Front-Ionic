import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscritoEventosPage } from './inscrito-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: InscritoEventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscritoEventosPageRoutingModule {}
