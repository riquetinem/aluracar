import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { Agendamento } from '../../modelos/agendamento';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();

  private _alerta: Alert;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertContrl: AlertController,
    private _agendamentosService: AgendamentosServiceProvider) {

      this.carro = this.navParams.get('carroSelecionado');
      this.precoTotal = this.navParams.get('precoTotal');
  }

  agenda() {
    if(!this.nome || !this.endereco || !this.email){
      this._alertContrl.create({
        title: 'Preenchimento obrigatorio!',
        subTitle: 'Preencha todos os campos',
        buttons:[
          { text: 'ok' }
        ]
      }).present();

      return;
    }

    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal

    };

    this._alerta = this._alertContrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
      }
      ]
    });

    let mensagem = '';

    this._agendamentosService.agenda(agendamento)
      .finally(
        () => {
          this._alerta.setSubTitle(mensagem);
          this._alerta.present();
        }
      )
      .subscribe(
      () => {
        mensagem = 'Agendamento realizado!';
      },
      () => {
        mensagem = 'Falha no Agendamento. Tente novamente mais tarde!';
      }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

}
