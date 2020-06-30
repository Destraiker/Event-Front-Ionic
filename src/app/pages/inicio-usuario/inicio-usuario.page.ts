import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { DatePipe } from '@angular/common';

import { Evento } from '../../interfaces/evento.interface';
import { EventosService } from '../../service/eventos.service';


@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.page.html',
  styleUrls: ['./inicio-usuario.page.scss'],
})
export class InicioUsuarioPage implements OnInit {

  evento: Evento;

  constructor(
    private service: TokenService,
    private datePipe: DatePipe,
    private serviceEvento: EventosService
  ) { }

  ngOnInit() {

  }

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  async preencher() {
    await this.service.pegarPost().then(x => {
      console.log(x);
      let aux: any = x.body;

      aux.forEach(element => {
        let data = this.datePipe.transform(this.randomDate(new Date(2020, 6, 1), new Date(2021, 0, 1)), 'yyyy-MM-dd');
        let horaInicial = this.datePipe.transform(this.randomDate(new Date(2020, 6, 1), new Date(2021, 0, 1)), 'H:mm');
        let horaFinal = this.datePipe.transform(this.randomDate(new Date(2020, 6, 1), new Date(2021, 0, 1)), 'H:mm');
        let vagas = this.getRandomInt(5, 25);
        let event:any={
          Nome: element.title,
          Decricao: element.body,
          HoraInicio: horaInicial,
          HoraFinal: horaFinal,
          DataInicio: data,
          Vagas: vagas,
          Endereco_idEndereco: 4
        };
        this.serviceEvento.postEvent(event).then(x=>{
          console.log("Foi pa carai");
        }).catch(err=>{
          console.log("Não foi pa carai");
        })
        
      });

    }).catch(err => {
      console.log("ERRO: ", err);
    })
  }

}
