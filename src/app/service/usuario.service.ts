import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private backLink = environment.apiLink + "/user/";
  private headers;

  constructor(private http: HttpClient, private storage: Storage) { 
    
  }
  async NovoHeaders() {
    let jwt=await this.storage.get('jwt');
    return await new HttpHeaders({
      'x-access-token': jwt
    });
  }

  async getUsuario() {
    this.headers=await this.NovoHeaders();
    let resposta = await this.http.get(this.backLink,{ observe: 'response',headers: this.headers}).toPromise();
    console.log(resposta);
    return resposta;
  }

  async postUsuario(Dados) {
    console.log("Inicializando o post");
    let resposta = await this.http.post(this.backLink + "", Dados, { observe: 'response' }).toPromise();
    console.log("Post finalizado");
    console.log(resposta);
    return resposta;
  }

  async login(Dados) {
    console.log("Inicializando o post");
    let resposta = await this.http.post(this.backLink + "login", Dados, { observe: 'response' }).toPromise();
    console.log("Post finalizado");
    console.log(resposta);
    return resposta;
  }

  async updateUsuario(Dados) {
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

  async deleteUsuario() {
    this.headers=await this.NovoHeaders();
    console.log("Inicializando o post");
    let resposta = await this.http.delete(
      this.backLink,
      {
        observe: 'response',
        headers: this.headers
      }).toPromise();

    console.log("Post finalizado");
    console.log(resposta);
    return resposta;
  }

}
