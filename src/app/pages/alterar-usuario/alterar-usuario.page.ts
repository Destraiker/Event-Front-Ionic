import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-alterar-usuario',
  templateUrl: './alterar-usuario.page.html',
  styleUrls: ['./alterar-usuario.page.scss'],
})
export class AlterarUsuarioPage implements OnInit {

  usuario:Usuario={} as Usuario;
  aux:any;
  constructor(
    private usuarioService: UsuarioService,
    public alertController: AlertController,
    public modalController: ModalController
  ) { }

  async ngOnInit() {
    await this.usuarioService.getUsuario().then((resposta) => {
      this.aux = resposta.body;
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
      console.log(err);
    });
  }
  
  async okAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Suscesso!',
      message: 'Evento alterado com suscesso!',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.dismissModal();
        }
      }]
    });

    await alert.present();
  }
  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async onSubmit(form) {
    await this.usuarioService.updateUsuario(form.value).then((resposta) => {
      this.okAlert();
    }).catch((err) => {
      console.log(err);
      if (err.error.message != null || err.error.message != undefined) {
        this.errorAlert(err.error.message);
      } else {
        let erros = "";
        err.error.forEach(element => {
          erros += element.message + ", ";
        });
        this.errorAlert(erros);
      }
    });
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
