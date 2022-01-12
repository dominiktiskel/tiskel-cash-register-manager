import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'receipt',
        data: { pageTitle: 'Receipts' },
        loadChildren: () => import('./receipt/receipt.module').then(m => m.ReceiptModule),
      },
      {
        path: 'company',
        data: { pageTitle: 'Companies' },
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
      },
      {
        path: 'cash-register',
        data: { pageTitle: 'CashRegisters' },
        loadChildren: () => import('./cash-register/cash-register.module').then(m => m.CashRegisterModule),
      },
      {
        path: 'terminal',
        data: { pageTitle: 'Terminals' },
        loadChildren: () => import('./terminal/terminal.module').then(m => m.TerminalModule),
      },
      {
        path: 'payment',
        data: { pageTitle: 'Payments' },
        loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),
      },
      {
        path: 'payment-item',
        data: { pageTitle: 'PaymentItems' },
        loadChildren: () => import('./payment-item/payment-item.module').then(m => m.PaymentItemModule),
      },
      {
        path: 'invoice',
        data: { pageTitle: 'Invoices' },
        loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
      },
      {
        path: 'setting',
        data: { pageTitle: 'Settings' },
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
      },
      {
        path: 'log',
        data: { pageTitle: 'Logs' },
        loadChildren: () => import('./log/log.module').then(m => m.LogModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
