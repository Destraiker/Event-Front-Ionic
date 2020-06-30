import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Evento } from '../../interfaces/evento.interface';
import { EventosService } from '../../service/eventos.service';

import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../service/usuario.service';

import { Endereco } from '../../interfaces/endereco.interface';
import { EnderecoService } from '../../service/endereco.service';

import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { AlterarEventoPage } from '../alterar-evento/alterar-evento.page';

@Component({
  selector: 'app-detalhes-eventos',
  templateUrl: './detalhes-eventos.page.html',
  styleUrls: ['./detalhes-eventos.page.scss'],
})
export class DetalhesEventosPage implements OnInit {
  evento: Evento = {} as Evento;
  usuario: Usuario = {} as Usuario;
  usuarios: Usuario[];
  endereco: Endereco = {} as Endereco;
  aux: any;
  tipo: boolean = false;


  constructor(
    private eventosService: EventosService,
    private usuarioService: UsuarioService,
    private enderecoService: EnderecoService,

    private router: ActivatedRoute,
    private routerNavigate: Router,

    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController
  ) { }

  async alterarModal(idEvento) {
    const modal = await this.modalController.create({
      component: AlterarEventoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'idEvento': idEvento
      }
    });
     await modal.present();
     await modal.onWillDismiss().then(x=>{
      this.ngOnInit();
    })
  }


  async presentActionSheet(idEvento) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Opções',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteConfirm();
        }
      }, {
        text: 'Alterar',
        icon: 'share',
        handler: () => {
          this.alterarModal(idEvento);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async ngOnInit() {

    await this.eventosService.getByIdEvent(this.router.snapshot.paramMap.get('idEvento')).then((x) => {
      this.aux = x.body;
      this.evento = this.aux.data[0];
    }).catch((err) => {
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
    await this.usuarioService.getUsuario().then((x) => {
      this.aux = x.body;
      this.usuario = this.aux.data[0];
    }).catch((err) => {
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

    await this.enderecoService.getByIdAddress(this.evento.Endereco_idEndereco).then((x) => {
      this.aux = x.body;
      this.endereco = this.aux.data[0];
    }).catch((err) => {
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
    await this.eventosService.getUserRegister(this.evento.idEvento).then((x) => {
      this.aux = x.body;
      this.usuarios = this.aux.data;
    }).catch((err) => {
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
    if (this.evento.Usuario_idUsuario == this.usuario.idUsuario) {
      this.tipo = true;
    }

    await this.usuarios.forEach(x => {
      if (x.idUsuario == this.usuario.idUsuario) {
        this.tipo = true;
      }
    })
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

  async deleteConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: '<strong>Tem certeza que deseja remover evento?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Ok',
          handler: () => {
            this.deletarEvento();
          }
        }
      ]
    });

    await alert.present();
  }
  async inscreverse() {
    await this.eventosService.inscreverEvento(this.evento).then(async x => {
      console.log("TA AQUI ZE,ESQUENTA Não")
      this.okAlert();
    }).catch(err => {
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
      message: 'Voce foi inscrito no evento!',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.routerNavigate.navigateByUrl('/usuario/gerenciar-eventos');
        }
      }]
    });
    await alert.present();
  }
  async deletarEvento() {
    if (this.usuario.idUsuario == this.evento.Usuario_idUsuario) {
      this.eventosService.deleteEvent(this.evento.idEvento);
    } else {
      this.eventosService.desinscreverEvento(this.evento);
    }
    this.routerNavigate.navigate(['/usuario/gerenciar-eventos/']);
  }
}
