import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SellCarComponent } from './sell-car/sell-car.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { UpdateCarComponent } from './update-car/update-car.component';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'stock', component: StockListComponent },
  { path: 'sell-car', component: SellCarComponent},
  { path: 'purchase/:id', component: PurchaseComponent },
  { path: 'update-car', component: UpdateCarComponent },
  { path: 'purchase-orders', component: PurchaseOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }