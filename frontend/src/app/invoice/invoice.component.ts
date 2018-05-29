import { AuthenticationService } from './../authentication/authentication.service';
import { AlertService } from './../alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { Invoice } from '../model/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoices: Invoice[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loadAllInvoices();
  }

  private loadAllInvoices() {
    this.invoiceService.getAllInvoicesByMemberId(this.authenticationService.getMemberId()).subscribe(
      results => {
        this.invoices = results;
      },
      error => {
        this.alertService.error(error.status, error.error.message);
      });
  }

}
