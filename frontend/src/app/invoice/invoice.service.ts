import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice';

@Injectable()
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getAllInvoicesByMemberId(memberId: number) {
    return this.http.get<Invoice[]>('http://localhost:8080/api/private/members/' + memberId + '/invoices');
  }

}
