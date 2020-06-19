import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarEnderecosPage } from './cadastrar-enderecos.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarEnderecosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarEnderecosPageRoutingModule {}
