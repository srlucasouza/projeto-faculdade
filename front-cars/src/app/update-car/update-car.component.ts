import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../models/car.model';
import { CarService } from '../car.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {
  cars: Car[] = [];
  selectedCar: Car | undefined;
  showSuccessAlert: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private route: ActivatedRoute, private carService: CarService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.loadCars();
      }
    });
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe(
      (cars: Car[]) => {
        this.cars = cars;
      },
      (error: any) => {
        console.error('Error loading cars:', error);
      }
    );
  }

  selectCar(car: Car): void {
    this.selectedCar = car;
  }

  updateCar(): void {
    if (this.selectedCar && this.selectedCar._id !== undefined) {
      const confirmUpdate = window.confirm('Tem certeza que deseja atualizar este carro?');

      if (confirmUpdate) {
        this.carService.updateCar(this.selectedCar._id.toString(), this.selectedCar).subscribe(
          updatedCar => {
            alert('Carro atualizado com sucesso!');
            this.showSuccessAlert = true;
            setTimeout(() => {
              this.showSuccessAlert = false;
              window.location.reload();
            }, 1300);
          },
          (error: any) => {
            console.error('Error updating car:', error);
          }
        );
      }
    } else {
      alert('Nenhum carro selecionado para atualização!');
    }
  }

  handlePasswordEntered(password: string): void {
    this.authService.authenticate(password).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.loadCars();
      } else {
        alert('Senha incorreta. Tente novamente.');
      }
    });
  }
}
