import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarEventosPage } from './visualizar-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarEventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarEventosPageRoutingModule {}
