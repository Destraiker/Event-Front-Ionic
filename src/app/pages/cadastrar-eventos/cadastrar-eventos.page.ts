import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { EventosService } from '../../service/eventos.service';
import { Endereco } from '../../interfaces/endereco.interface';
import { EnderecoService } from '../../service/endereco.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { CadastrarEnderecosPage } from '../cadastrar-enderecos/cadastrar-enderecos.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar-eventos',
  templateUrl: './cadastrar-eventos.page.html',
  styleUrls: ['./cadastrar-eventos.page.scss'],
})
export class CadastrarEventosPage implements OnInit {
  evento: Evento = {} as Evento;
  enderecos: Endereco[];
  aux: any;

  constructor(
    private eventoService: EventosService,
    private enderecoService: EnderecoService,
    public alertController: AlertController,
    private router: Router,
    public modalController: ModalController
  ) { }

  async enderecoModal() {
    const modal = await this.modalController.create({
      component: CadastrarEnderecosPage,
      cssClass: 'my-custom-class'
    });
    await modal.present();
    await modal.onWillDismiss().then(x=>{
      this.ngOnInit();
    })
  }

  async ngOnInit() {
    await this.enderecoService.getAddress().then((resposta) => {
      this.aux = resposta.body;
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
      console.log(err);
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
  async okAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Suscesso!',
      message: 'Evento cadastrado com suscesso!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async onSubmit(form) {
    console.log(form.value);
    await this.eventoService.postEvent(form.value).then((resposta) => {
      this.okAlert();
      this.router.navigate(['/usuario/gerenciar-eventos']);
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
}
