import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private backLink = environment.apiLink + "/token/";
  constructor(private http: HttpClient, private storage: Storage) {
  }
  async NovoHeaders() {
    let jwt=await this.storage.get('jwt');
    return jwt;
  }

  async verificarToken() {
    console.log("Inicializando o post");
    let jwt= await this.NovoHeaders();
    var token = { token: jwt };
    let resposta = await this.http.post(this.backLink + "", token, { observe: 'response' }).toPromise();
    console.log("Post finalizado");
    console.log(resposta);
    return resposta;
  }
}
