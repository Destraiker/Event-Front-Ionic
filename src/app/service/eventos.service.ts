import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private backLink = environment.apiLink + "/event/";
  private headers;

  constructor(private http: HttpClient, private storage: Storage) {
  }

  async NovoHeaders() {
    let jwt=await this.storage.get('jwt');
    return await new HttpHeaders({
      'x-access-token': jwt
    });
  }

  async getEvent(pag) {
    this.headers=await this.NovoHeaders();
    let resposta = await this.http.get(this.backLink + "page/" + pag, { observe: 'response', headers: this.headers }).toPromise();
    console.log(resposta);
    console.log("resposta");
    return resposta;
  }
  async getByIdEvent(idEvento) {
    this.headers=await this.NovoHeaders();
    let resposta = await this.http.get(this.backLink + idEvento, { observe: 'response', headers: this.headers }).toPromise();
    console.log(resposta);
    return resposta;
  }

  async getMyEvents() {
    this.headers=await this.NovoHeaders();
    let resposta = await this.http.get((this.backLink + 'myEvents/'), { observe: 'response', headers: this.headers }).toPromise();
    console.log(resposta);
    console.log("resposta");
    return resposta;
  }

  async getEventsRegister() {
    this.headers=await this.NovoHeaders();
    let resposta = await this.http.get((this.backLink + 'eventsRegister/'), { observe: 'response', headers: this.headers }).toPromise();
    console.log(resposta);
    console.log("resposta");
    return resposta;
  }
  async getUserRegister(idEvento) {
    this.headers=await this.NovoHeaders();
    let resposta = await this.http.get((this.backLink + 'usersRegister/'+idEvento), { observe: 'response', headers: this.headers }).toPromise();
    console.log(resposta);
    console.log("resposta");
    return resposta;
  }

  async postEvent(Dados) {
    this.headers=await this.NovoHeaders();
    console.log("Inicializando o post");
    let resposta = await this.http.post(this.backLink + "", Dados, {
      observe: 'response',
      headers: this.headers
    }).toPromise();
    console.log("Post finalizado");
    console.log(resposta);
    return resposta;
  }

  async updateEvent(Dados) {
    this.headers=await this.NovoHeaders();
    console.log("Inicializando o post");
    let resposta = await this.http.put(
      this.backLink + "",
      Dados,
      {
        observe: 'response',
        headers: this.headers
      }).toPromise();

    console.log("Post finalizado");
    console.log(resposta);
    return resposta;
  }

  async deleteEvent(idEvento) {
    this.headers=await this.NovoHeaders();
    console.log("Inicializando o post");
    let resposta = await this.http.delete(
      this.backLink + idEvento,
      {
        observe: 'response',
        headers: this.headers
      }).toPromise();

    console.log("Post finalizado");
    console.log(resposta);
    return resposta;
  }
  async desinscreverEvento(Dados) {
    this.headers=await this.NovoHeaders();
    console.log("Inicializando o post");
    let resposta = await this.http.post(this.backLink + "deleteUserOfEvent/", Dados, {
      observe: 'response',
      headers: this.headers
    }).toPromise();
    console.log("Post finalizado");
    console.log(resposta);
    return resposta;
  }
  async inscreverEvento(Dados) {
    this.headers=await this.NovoHeaders();
    console.log("Inicializando o post");
    let resposta = await this.http.post(this.backLink + "registerUserOfEvent/", Dados, {
      observe: 'response',
      headers: this.headers
    }).toPromise();
    console.log("Post finalizado");
    console.log(resposta);
    return resposta;
  }
}
