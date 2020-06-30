import { Component, OnInit, Input } from '@angular/core';

import { Evento } from '../../interfaces/evento.interface';
import { EventosService } from '../../service/eventos.service';

import { Endereco } from '../../interfaces/endereco.interface';
import { EnderecoService } from '../../service/endereco.service';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { CadastrarEnderecosPage } from '../cadastrar-enderecos/cadastrar-enderecos.page';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-alterar-evento',
  templateUrl: './alterar-evento.page.html',
  styleUrls: ['./alterar-evento.page.scss'],
})
export class AlterarEventoPage implements OnInit {
  evento: Evento = {} as Evento;
  enderecos: Endereco[];
  aux: any;
  @Input() idEvento;
  vagas: number;


  constructor(
    private eventoService: EventosService,
    private enderecoService: EnderecoService,
    public alertController: AlertController,
    private router: Router,
    public modalController: ModalController
  ) { }

  async ngOnInit() {
    await this.eventoService.getByIdEvent(this.idEvento).then((resposta) => {
      this.aux = resposta.body;
      this.evento = this.aux.data[0];
      this.vagas=this.evento.Vagas;
      this.evento.Vagas=0;
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

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
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
  async onSubmit(form) {
    console.log("FORM VALUE",form.value);
    form.value.idEvento=this.evento.idEvento;
    form.value.Vagas=form.value.Vagas+this.vagas;
    console.log("FORM VALUE2",form.value);
    await this.eventoService.updateEvent(form.value).then((resposta) => {

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

}
