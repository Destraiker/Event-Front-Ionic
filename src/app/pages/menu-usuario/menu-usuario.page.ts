import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.page.html',
  styleUrls: ['./menu-usuario.page.scss'],
})
export class MenuUsuarioPage implements OnInit {
  public nome;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: '/usuario/',
      icon: 'home'
    },
    {
      title: 'Eventos',
      url: '/usuario/visualizar-eventos',
      icon: 'list-circle'
    },
    {
      title: 'Criar evento',
      url: '/usuario/cadastrar-eventos',
      icon: 'add-circle'
    },
    {
      title: 'Gerenciar eventos',
      url: '/usuario/gerenciar-eventos',
      icon: 'american-football'
    },
    {
      title: 'Gerenciar endereços',
      url: '/usuario/gerenciar-enderecos',
      icon: 'navigate'
    }
  ];
  public labels = ['Perfil', 'Sair'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.nome = await this.storage.get('Nome');
    await this.storage.get('Nome').then(x => {
      console.log(this.nome);
      console.log(x);
    })
  }

  sair() {
    this.storage.clear();
    this.router.navigate(['/']);
  }


  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

}
