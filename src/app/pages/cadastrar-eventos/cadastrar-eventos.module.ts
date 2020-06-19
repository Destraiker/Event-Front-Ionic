import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarEventosPageRoutingModule } from './cadastrar-eventos-routing.module';

import { CadastrarEventosPage } from './cadastrar-eventos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarEventosPageRoutingModule
  ],
  declarations: [CadastrarEventosPage]
})
export class CadastrarEventosPageModule {}
