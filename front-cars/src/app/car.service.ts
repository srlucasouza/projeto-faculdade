import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../app/models/car.model'

@Injectable({
    providedIn: 'root'
})

export class CarService {
    private apiUrl = 'http://localhost:3000/cars';

    constructor(private http: HttpClient) { }

    getAllCars(): Observable<Car[]> {
        return this.http.get<Car[]>(this.apiUrl);
    }

    getCarById(id: string): Observable<Car> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Car>(url);
    }

    createCar(car: Car): Observable<Car> {
        return this.http.post<Car>(this.apiUrl, car);
    }

    updateCar(id: string, car: Car): Observable<Car> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Car>(url, car);
    }

    deleteCar(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url);
    }
}
