import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Endereco } from '../../interfaces/endereco.interface';
import { EnderecoService } from '../../service/endereco.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alterar-endereco',
  templateUrl: './alterar-endereco.page.html',
  styleUrls: ['./alterar-endereco.page.scss'],
})
export class AlterarEnderecoPage implements OnInit {
  endereco: Endereco = {} as Endereco;
  aux: any;
  @Input() idEndereco;
  constructor(
    private modalCtrl: ModalController,
    private enderecoService: EnderecoService,
    public alertController: AlertController
  ) { }

  async ngOnInit() {
    await this.enderecoService.getByIdAddress(this.idEndereco).then((x) => {
      this.aux = x.body;
      this.endereco = this.aux.data[0];
      console.log(this.endereco)
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
  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async onSubmit(form) {
    form.value.idEndereco=this.idEndereco;
    await this.enderecoService.updateAddress(form.value).then(x => {
      this.dismissModal();
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

}
