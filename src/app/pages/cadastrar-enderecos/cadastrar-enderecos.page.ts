import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Endereco } from '../../interfaces/endereco.interface';
import { EnderecoService } from '../../service/endereco.service';

@Component({
  selector: 'app-cadastrar-enderecos',
  templateUrl: './cadastrar-enderecos.page.html',
  styleUrls: ['./cadastrar-enderecos.page.scss'],
})
export class CadastrarEnderecosPage implements OnInit {
  endereco: Endereco = {} as Endereco;
  constructor(private modalCtrl: ModalController,private enderecoService: EnderecoService) { }

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

    })
  }

}
