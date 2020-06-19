import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { EventosService } from '../../service/eventos.service';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscrito-eventos',
  templateUrl: './inscrito-eventos.page.html',
  styleUrls: ['./inscrito-eventos.page.scss'],
})
export class InscritoEventosPage implements OnInit {

  eventosInscritos: Evento[];
  aux:any;

  constructor(
    private eventosService:EventosService,
    public alertController: AlertController,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.eventosService.getEventsRegister().then(x=>{
      this.aux = x.body;
      this.eventosInscritos = this.aux.data;
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

  detalhes(idEvento){
    this.router.navigate(['/usuario/detalhes-eventos/'+idEvento])
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
