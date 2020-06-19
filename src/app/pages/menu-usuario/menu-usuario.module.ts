import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuUsuarioPageRoutingModule } from './menu-usuario-routing.module';

import { MenuUsuarioPage } from './menu-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuUsuarioPageRoutingModule
  ],
  declarations: [MenuUsuarioPage]
})
export class MenuUsuarioPageModule {}
