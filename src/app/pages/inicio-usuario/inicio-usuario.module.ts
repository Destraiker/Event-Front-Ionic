import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioUsuarioPageRoutingModule } from './inicio-usuario-routing.module';

import { InicioUsuarioPage } from './inicio-usuario.page';

import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioUsuarioPageRoutingModule
    
  ],
  declarations: [InicioUsuarioPage],
  providers:[
    DatePipe
  ]
})
export class InicioUsuarioPageModule {}
