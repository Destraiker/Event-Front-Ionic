import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../interfaces/usuario.interface';
import {UsuarioService} from '../../service/usuario.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {
  usuario: Usuario={} as Usuario;

  constructor(private usuarioService: UsuarioService,public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async register(form){
    await this.usuarioService.postUsuario(form.value).then((x)=>{
     
      this.okAlert();
    }).catch((err)=>{
      if (err.error.message != null || err.error.message != undefined) {
        this.errorAlert(err.error.message);
      } else {
        let erros = "";
        err.error.forEach(element => {
          erros += element.message + ", ";
        });
        this.errorAlert(erros);
      }
    })
  }
  async okAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Suscesso!',
      message: 'Cadastrado com suscesso!',
      buttons: [{
        text: 'Ok',
        handler: ()=>{
          this.router.navigate(['/login/']);
        }
      }]
    });

    await alert.present();
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
