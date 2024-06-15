import { Injectable } from '@nestjs/common';
import { Car } from './schema/car.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CarsService {

    constructor (@InjectModel(Car.name) private carModel: Model <Car>){}
    async createCar(car: Car) {
        const newCar = new this.carModel({
            marca: car.marca,
            modelo: car.modelo,
            ano: car.ano,
            cor: car.cor,
        });
        return await newCar.save();
    }

    async getAll() {
        return this.carModel.find().exec();
    }

    async getCar(id) {
        return this.carModel.findOne({ _id: id }).exec();
    }

    async updateCar(id, car) {
        return this.carModel.findByIdAndUpdate(id, car).exec();
    }

    async deleteCar(id) {
        return this.carModel.findByIdAndDelete(id).exec();
    }
}
 