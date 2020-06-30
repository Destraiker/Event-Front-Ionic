import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarEventoPageRoutingModule } from './alterar-evento-routing.module';

import { AlterarEventoPage } from './alterar-evento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarEventoPageRoutingModule
  ],
  declarations: [AlterarEventoPage]
})
export class AlterarEventoPageModule {}
