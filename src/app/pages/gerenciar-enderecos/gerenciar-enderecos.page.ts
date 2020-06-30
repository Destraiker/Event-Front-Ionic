import { Component, OnInit } from '@angular/core';

import { Endereco } from '../../interfaces/endereco.interface';
import { EnderecoService } from '../../service/endereco.service';

import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { CadastrarEnderecosPage } from '../cadastrar-enderecos/cadastrar-enderecos.page';
import { AlterarEnderecoPage } from '../alterar-endereco/alterar-endereco.page';

@Component({
  selector: 'app-gerenciar-enderecos',
  templateUrl: './gerenciar-enderecos.page.html',
  styleUrls: ['./gerenciar-enderecos.page.scss'],
})
export class GerenciarEnderecosPage implements OnInit {

  enderecos: Endereco[];
  aux: any;

  constructor(
    private enderecoService: EnderecoService,

    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController
  ) { }

  async ngOnInit() {
    await this.enderecoService.getAddress().then((x) => {
      this.aux = x.body;
      this.enderecos = this.aux.data;
    }).catch((err) => {
      if (err.error.message != null || err.error.message != undefined) {
        this.errorAlert(err.error.message);
      } else {
        let erros = "";
        err.error.forEach(element => {
          erros += element.message + ", ";
        });
        this.errorAlert(erros);
      }
    })
  }
  async enderecoModal() {
    const modal = await this.modalController.create({
      component: CadastrarEnderecosPage,
      cssClass: 'my-custom-class'
    });
    await modal.present();
    return await modal.onWillDismiss().then(x=>{
      this.ngOnInit();
    })
  }
  async alterar(idEndereco) {
    const modal = await this.modalController.create({
      component: AlterarEnderecoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'idEndereco': idEndereco
      }
    });
    await modal.present();
    return await modal.onWillDismiss().then(x=>{
      this.ngOnInit();
    })
  }

  async presentActionSheet(idEndereco) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Opções',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteConfirm(idEndereco);
        }
      }, {
        text: 'Alterar',
        icon: 'share',
        handler: () => {
          this.alterar(idEndereco);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  

  async deleteConfirm(idEndereco) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: '<strong>Tem certeza que deseja remover esse Endereço?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Ok',
          handler: () => {
            this.deletarEndereco(idEndereco);
          }
        }
      ]
    });
    await alert.present();
  }
  async deletarEndereco(idEndereco) {
    await this.enderecoService.deleteAddress(idEndereco).then(x=>{
      this.ngOnInit();
    }).catch(err=>{
      if (err.error.message != null || err.error.message != undefined) {
        this.errorAlert(err.error.message);
      } else {
        let erros = "";
        err.error.forEach(element => {
          erros += element.message + ", ";
        });
        this.errorAlert(erros);
      }
    })
  }
  async errorAlert(err) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Erro!',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }

}
