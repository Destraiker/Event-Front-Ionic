import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarEnderecosPageRoutingModule } from './cadastrar-enderecos-routing.module';

import { CadastrarEnderecosPage } from './cadastrar-enderecos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarEnderecosPageRoutingModule
  ],
  declarations: [CadastrarEnderecosPage]
})
export class CadastrarEnderecosPageModule {}
