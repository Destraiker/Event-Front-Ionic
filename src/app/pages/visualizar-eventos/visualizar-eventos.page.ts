import { Component, OnInit, ViewChild } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { EventosService } from '../../service/eventos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-visualizar-eventos',
  templateUrl: './visualizar-eventos.page.html',
  styleUrls: ['./visualizar-eventos.page.scss'],
})
export class VisualizarEventosPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  eventos: Evento[];
  respObj: any;
  private page = 0;

  constructor(private eventoService: EventosService, public alertController: AlertController, private router: Router) { }

  async ngOnInit() {
    await this.eventoService.getEvent(this.page).then((resposta) => {
      this.respObj = resposta.body;
      this.eventos = this.respObj.data;
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
    });
  }
  detalhes(idEvento) {
    this.router.navigate(['/usuario/detalhes-eventos/' + idEvento])
  }
  async loadData(event) {
    setTimeout(async () => {
      console.log('Done');
      event.target.complete();
      this.page += 1;
      await this.eventoService.getEvent(this.page).then((resposta) => {
        this.respObj = resposta.body;
        this.respObj.data.forEach(element => {
          this.eventos.push(element);
        });
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
      });
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (event == 1000) {
        event.target.disabled = true;
      }
    }, 500);
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
