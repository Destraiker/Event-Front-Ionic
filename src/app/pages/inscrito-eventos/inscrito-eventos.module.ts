import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscritoEventosPageRoutingModule } from './inscrito-eventos-routing.module';

import { InscritoEventosPage } from './inscrito-eventos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscritoEventosPageRoutingModule
  ],
  declarations: [InscritoEventosPage]
})
export class InscritoEventosPageModule {}
