import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private backLink = environment.apiLink + "/user/address/";
  private headers;

  constructor(private http: HttpClient, private storage: Storage) {
    
  }
  async NovoHeaders() {
    let jwt=await this.storage.get('jwt');
    return await new HttpHeaders({
      'x-access-token': jwt
    });
  }

  async getAddress() {
    this.headers=await this.NovoHeaders();
    let resposta = await this.http.get(this.backLink, { observe: 'response', headers: this.headers }).toPromise();
    console.log(resposta);
    return resposta;
  }
  async getByIdAddress(idEndereco) {
    this.headers=await this.NovoHeaders();
    let resposta = await this.http.get(this.backLink + idEndereco, { observe: 'response', headers: this.headers }).toPromise();
    console.log(resposta);
    return resposta;
  }

  async postAddress(Dados) {
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

  async updateAddress(Dados) {
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

  async deleteAddress(idEndereco) {
    this.headers=await this.NovoHeaders();
    console.log("Inicializando o post");
    let resposta = await this.http.delete(
      this.backLink + idEndereco,
      {
        observe: 'response',
        headers: this.headers
      }).toPromise();

    console.log("Post finalizado");
    console.log(resposta);
    return resposta;
  }
}
