import { Injectable } from '@angular/core';
import { Client } from '../interface/client';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private api: ApiService) { }

  createClient(client: Client) {
    return this.api.post('client', { client });
  }
}
