import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../models/car.model';
import { CarService } from '../car.service';
import { FormService } from '../form.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  car: Car | undefined;
  telefone: string = '';
  email: string = '';
  formaPagamento: string = 'Á Vista';

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.loadCarDetails();
  }

  loadCarDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carService.getCarById(id).subscribe(
        car => {
          this.car = car;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  submitPurchase(): void {
    if (confirm('Tem certeza que deseja finalizar a compra?')) {
      if (this.telefone && this.email && this.formaPagamento && this.car) {
        const formData = {
          telefone: this.telefone,
          email: this.email,
          formaPagamento: this.formaPagamento,
          carId: this.car._id
        };

        this.formService.saveForm(formData).subscribe(
          (response: any) => {
            alert('Compra registrada com sucesso, aguarde confirmação da equipe de vendas!');
            window.location.reload();
          },
          (error: any) => {
            alert('Erro ao finalizar a compra. Por favor, tente novamente.');
          }
        );

      } else {
        alert('Preencha todos os campos obrigatórios antes de finalizar a compra.');
      }
    }
  }
}
