import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interface/client';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent {

  public clientVAT: string[] = [
    '0-Responsable Inscriptio',
    '1-Monotributo',
    '2-Exento',
    '3-Consumidor Final'
  ];

  public clientDocType: {type: string, desc: string}[] = [
    { type: '96', desc: 'DNI' },
    { type: '80', desc: 'CUIT' },
    { type: '86', desc: 'CUIL' },
    { type: '87', desc: 'CDI' },
    { type: '89', desc: 'LE' },
    { type: '90', desc: 'LC' },
    { type: '91', desc: 'CI' },
    { type: '92', desc: 'En trámite' },
    { type: '93', desc: 'Acta Nacimiento' },
    { type: '95', desc: 'CI Bs. As. RNP	' },
    { type: '99', desc: 'Otro Doc' }
  ];

  public errors: any = {
    nameError: false,
    telError: false,
    addressError: false,
    emailError: false,
    idTypeError: false,
    idNumberError: false,
    VATCondError: false,
    existingIdNumberError: false,
    createClientError: false,
  }

  public client: Client = {
    name: '',
    address: '',
    tel: '',
    email: '',
    idNumber: '',
    idType: '-1',
    VATCondition: '-1'
  };

  constructor(private cs: ClientService, private ts: ToastService) { }

  public addClientBtnClick() {
    this.resetErrors();
    if (this.clientValidations()) {
      this.cs.createClient(this.client).subscribe({
        next: r => {
          this.ts.add('Nuevo Cliente', 'Cliente creado correctamente');
          this.resetClient();
        },
        error: e => {
          console.log(e);
          if (e.status === 400) {
            this.errors.existingIdNumberError = true;
          } else {
            this.errors.createClientError = true;
          }
        }
      })
    }
  }

  private resetClient() {
    this.client = {
      name: '',
      address: '',
      tel: '',
      email: '',
      idNumber: '',
      idType: '-1',
      VATCondition: '-1'
    };
  }

  private resetErrors() {
    Object.keys(this.errors).forEach(
      k => {
        this.errors[k] = false;
      }
    );
  }

  private clientValidations() {
    this.errors.nameError = this.client.name === '';
    this.errors.telError = this.client.tel === '';
    this.errors.addressError = this.client.address === '';
    this.errors.emailError = this.client.email === '';
    this.errors.idTypeError = this.client.idType === '-1';
    this.errors.idNumberError = this.client.idNumber === '';
    this.errors.VATCondError = this.client.VATCondition === '-1';
    return Object.keys(this.errors).find(k => this.errors[k]) === undefined;
  }

}
