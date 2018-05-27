import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { InvoiceService } from './invoice.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    InvoiceComponent,
  ],
  exports: [
    InvoiceComponent,
  ],
  providers: [
    InvoiceService
  ]
})
export class InvoiceModule { }
