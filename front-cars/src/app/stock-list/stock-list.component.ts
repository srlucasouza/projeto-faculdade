import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../car.service';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.loadCarStock();
  }

  loadCarStock(): void {
    this.carService.getAllCars().subscribe(
      cars => {
        this.cars = cars;
        console.log(cars)
      },
      error => {
        console.error(error);
      }
    );
  }

  comprarVeiculo(car: Car): void {
    console.log(car)
    if (car._id !== undefined) {
      this.router.navigate(['/purchase', car._id]);
    }
  }
  
}
