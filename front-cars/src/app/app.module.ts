import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SellCarComponent } from './sell-car/sell-car.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PurchaseComponent } from './purchase/purchase.component';
import { UpdateCarComponent } from './update-car/update-car.component';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';
import { PhoneMaskDirective } from './phone-mask.directive';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    StockListComponent,
    SellCarComponent,
    PurchaseComponent,
    UpdateCarComponent,
    PurchaseOrdersComponent,
    PhoneMaskDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CurrencyMaskModule,
    BrowserAnimationsModule,
    CalendarModule,
    PaginatorModule
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    StockListComponent,
    SellCarComponent,
    PurchaseComponent,
    UpdateCarComponent,
    PurchaseOrdersComponent,
    PhoneMaskDirective
  ]
})
export class AppModule { }
