import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../interfaces/usuario.interface';
import {UsuarioService} from '../../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {
  usuario: Usuario={} as Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  async register(form){
    await this.usuarioService.postUsuario(form.value).then((x)=>{
      alert("Cadastrado com suscesso.");
      this.router.navigate(['/login/']);
    }).catch((err)=>{
      alert("Erro!");
    })
  }
}
