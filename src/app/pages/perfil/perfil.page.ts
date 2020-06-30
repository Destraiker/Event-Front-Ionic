import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../service/usuario.service';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { AlterarUsuarioPage } from '../alterar-usuario/alterar-usuario.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: Usuario = {} as Usuario;
  aux: any;

  constructor(
    private usuarioService: UsuarioService,
    public alertController: AlertController,
    private storage: Storage,
    private router: Router,
    public modalController: ModalController
  ) { }

  async alterarModal() {
    const modal = await this.modalController.create({
      component: AlterarUsuarioPage,
      cssClass: 'my-custom-class'
    });
    await modal.present();
    return await modal.onWillDismiss().then(x=>{
      this.ngOnInit();
    })
  }

  async ngOnInit() {
    await this.usuarioService.getUsuario().then((x) => {
      this.aux = x.body;
      this.usuario = this.aux.data[0];
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

  async deleteConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: '<strong>Tem certeza que deseja remover sua conta?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Ok',
          handler: () => {
            this.deletarEvento();
          }
        }
      ]
    });
    await alert.present();
  }

  async deletarEvento() {
    await this.usuarioService.deleteUsuario().then(x => {
      this.storage.clear();
      this.router.navigate(['/']);
    }).catch(err => {
      console.log("ERRO: ",err)
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
