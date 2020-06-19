import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { EventosService } from '../../service/eventos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizar-eventos',
  templateUrl: './visualizar-eventos.page.html',
  styleUrls: ['./visualizar-eventos.page.scss'],
})
export class VisualizarEventosPage implements OnInit {
  eventos: Evento[];
  respObj: any;

  constructor(private eventoService: EventosService, private router: Router) { }

  async ngOnInit() {
    await this.eventoService.getEvent(0).then((resposta) => {
      this.respObj = resposta.body;
      this.eventos = this.respObj.data;
    }).catch((err) => {
      console.log("ERRO:");
      console.log(err);
    });
  }
  detalhes(idEvento){
    this.router.navigate(['usuario/evento/'+idEvento]);
  }

}
