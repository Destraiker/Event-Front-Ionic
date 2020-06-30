import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Endereco } from '../../interfaces/endereco.interface';
import { EnderecoService } from '../../service/endereco.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar-enderecos',
  templateUrl: './cadastrar-enderecos.page.html',
  styleUrls: ['./cadastrar-enderecos.page.scss'],
})
export class CadastrarEnderecosPage implements OnInit {
  endereco: Endereco = {} as Endereco;
  
  constructor(private modalCtrl: ModalController,public alertController: AlertController,private enderecoService: EnderecoService) { }

  ngOnInit() {

  }

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async onSubmit(form){
    await this.enderecoService.postAddress(form.value).then(x=>{
      this.dismissModal();
    }).catch(err=>{
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
