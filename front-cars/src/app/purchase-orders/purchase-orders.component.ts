import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { CarService } from '../car.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.css']
})
export class PurchaseOrdersComponent implements OnInit {
  purchaseOrders: any[] = [];
  isAuthenticated: boolean = false;
  telefoneFormatado: string = '';
  formaDePagamento: string = '';

  constructor(
    private formService: FormService,
    private carService: CarService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
      if (authenticated) {
        this.loadPurchaseOrders();
      }
    });
  }

  loadPurchaseOrders(): void {
    this.formService.getAllForms().subscribe(
      (orders) => {
        this.purchaseOrders = orders;
        this.purchaseOrders.forEach(order => {
          order.telefoneFormatado = this.formatarTelefone(order.telefone);
          order.formaDePagamento = this.formatarPagamento(order.formaPagamento);
        });
        this.loadCarModels();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  formatarTelefone(telefone: string): string {
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`;
  }

  formatarPagamento(pagamento: string): string {
    return pagamento == 'financiamento' ? 'Financiamento' : 'Á vista'
  }

  loadCarModels(): void {
    this.purchaseOrders.forEach((order) => {
      this.carService.getCarById(order.carId).subscribe(
        (car) => {
          order.requestedCarModel = car.modelo;
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  rejectOrder(orderId: string): void {
    if (!this.isAuthenticated) {
      alert('Você precisa estar autenticado para recusar pedidos.');
      return;
    }

    if (confirm('Tem certeza que deseja recusar este pedido?')) {
      this.formService.deleteForm(orderId).subscribe(
        () => {
          alert('Pedido recusado com sucesso!');
          this.loadPurchaseOrders();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  acceptOrder(orderId: string, carId: string): void {
    if (!this.isAuthenticated) {
      alert('Você precisa estar autenticado para aceitar pedidos.');
      return;
    }

    if (confirm('Tem certeza que deseja aceitar este pedido e remover o carro do estoque?')) {
      this.formService.deleteForm(orderId).subscribe(
        () => {
          this.carService.deleteCar(carId).subscribe(
            () => {
              alert('Pedido aceito e carro removido do estoque!');
              this.loadPurchaseOrders();
            },
            (error) => {
              console.error(error);
            }
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  authenticate(password: string): void {
    this.authService.authenticate(password).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.loadPurchaseOrders();
      } else {
        alert('Senha incorreta. Tente novamente.');
      }
    });
  }
}
