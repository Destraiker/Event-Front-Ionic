import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { EventosService } from '../../service/eventos.service';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meus-eventos',
  templateUrl: './meus-eventos.page.html',
  styleUrls: ['./meus-eventos.page.scss'],
})
export class MeusEventosPage implements OnInit {

  meusEventos: Evento[];
  aux:any;

  constructor(
    private eventosService:EventosService,
    public alertController: AlertController,
    private router: Router
  ) { }

  async ngOnInit() {
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

  detalhes(idEvento){
    this.router.navigate(['/usuario/detalhes-eventos/'+idEvento]);
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
