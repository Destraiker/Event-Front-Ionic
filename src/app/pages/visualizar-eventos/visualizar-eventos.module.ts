import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarEventosPageRoutingModule } from './visualizar-eventos-routing.module';

import { VisualizarEventosPage } from './visualizar-eventos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarEventosPageRoutingModule
  ],
  declarations: [VisualizarEventosPage]
})
export class VisualizarEventosPageModule {}
