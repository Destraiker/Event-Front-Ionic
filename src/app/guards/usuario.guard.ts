import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {TokenService} from '../service/token.service';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class UsuarioGuard implements CanActivate {
  private jwt=null;

  constructor(private service: TokenService, private storage: Storage){
    this.storage.get('jwt').then((x)=>{
      this.jwt=x;
    })
  }
  
  async canActivate(){
    if(this.jwt!==null){
      let resposta= await this.service.verificarToken();
      if(resposta.ok){
        return true;
      }else{
        this.storage.clear();
        return false;
      }
    }else{
      this.storage.clear();
      return false;
    }
  }
  
}
