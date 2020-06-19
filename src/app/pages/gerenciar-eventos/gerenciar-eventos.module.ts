import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GerenciarEventosPageRoutingModule } from './gerenciar-eventos-routing.module';

import { GerenciarEventosPage } from './gerenciar-eventos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GerenciarEventosPageRoutingModule
  ],
  declarations: [GerenciarEventosPage]
})
export class GerenciarEventosPageModule {}
