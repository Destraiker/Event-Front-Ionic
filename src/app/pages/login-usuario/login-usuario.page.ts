import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';

import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.page.html',
  styleUrls: ['./login-usuario.page.scss'],
})
export class LoginUsuarioPage implements OnInit {
  usuario: Usuario = {} as Usuario;
  respObj: any;

  constructor(private usuarioService: UsuarioService, private router: Router, private storage: Storage,public alertController: AlertController) { }

  ngOnInit() {
    
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

  async login(form) {
    await this.usuarioService.login(form.value).then((resposta) => {
      this.respObj = resposta.body;
      this.storage.set('jwt', this.respObj.data.jwt);
      this.storage.set('Nome', this.respObj.data.data.Nome);
      this.router.navigate(['/usuario/']);
    }).catch((err) => {
      console.log(err);
      if(err.error.message!=null || err.error.message!=undefined){
        this.errorAlert(err.error.message);
      }else{
        let erros="";
        err.error.forEach(element => {
          erros+=element.message+ ", ";
        });
        this.errorAlert(erros);
      }
    })
  }
}
