import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { EventosService } from '../../service/eventos.service';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerenciar-eventos',
  templateUrl: './gerenciar-eventos.page.html',
  styleUrls: ['./gerenciar-eventos.page.scss'],
})
export class GerenciarEventosPage implements OnInit {

  eventosInscritos: Evento[];
  meusEventos: Evento[];
  aux: any;

  constructor(
    private eventosService: EventosService,
    public alertController: AlertController,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.eventosService.getEventsRegister().then(x => {
      this.aux = x.body;
      this.eventosInscritos = this.aux.data;
    }).catch(err => {
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
    console.log("Chego aqui");
    await this.eventosService.getMyEvents().then(x=>{
      this.aux = x.body;
      this.meusEventos = this.aux.data;
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
    });
  }
  segmentChanged(aba) {
    console.log("TA AQUI CARAI, ABA È: ",aba);
    if(aba.detail.value=="meusEventos"){
      document.getElementById('meusEventos').style.display="block";
      document.getElementById('eventosInscritos').style.display="none";
    }else if(aba.detail.value=="eventosInscritos"){
      document.getElementById('meusEventos').style.display="none";
      document.getElementById('eventosInscritos').style.display="block";
    }
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
