import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice';

@Injectable()
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getAllInvoicesByUserId(userId: number) {
    return this.http.get<Invoice[]>('http://localhost:8080/api/private/users/' + userId + '/invoices');
  }

}
