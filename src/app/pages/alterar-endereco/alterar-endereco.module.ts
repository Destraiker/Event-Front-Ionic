import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarEnderecoPageRoutingModule } from './alterar-endereco-routing.module';

import { AlterarEnderecoPage } from './alterar-endereco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarEnderecoPageRoutingModule
  ],
  declarations: [AlterarEnderecoPage]
})
export class AlterarEnderecoPageModule {}
