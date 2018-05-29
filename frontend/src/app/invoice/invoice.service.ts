import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice';
import { environment } from '../../environments/environment';

@Injectable()
export class InvoiceService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllInvoicesByMemberId(memberId: number) {
    return this.http.get<Invoice[]>(this.baseUrl + '/private/members/' + memberId + '/invoices');
  }

}
