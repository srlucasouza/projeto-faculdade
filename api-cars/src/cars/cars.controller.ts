import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './schema/car.schema';

@Controller('cars')
export class CarsController {
    constructor(private readonly carService: CarsService) {}

    @Post()
    async createCar(@Body() car: Car): Promise<Car> {
        return this.carService.createCar(car);
    }

    @Get()
    async getAll(): Promise<Car[]> {
        return this.carService.getAll();
    }

    @Get(':id')
    async getCar(@Param('id') id: string): Promise<Car> {
        const car = await this.carService.getCar(id);
        if (!car) {
            throw new NotFoundException('Car not found');
        }
        return car;
    }

    @Put(':id')
    async updateCar(@Param('id') id: string, @Body() car: Car): Promise<Car> {
        const updatedCar = await this.carService.updateCar(id, car);
        if (!updatedCar) {
            throw new NotFoundException('Car not found');
        }
        return updatedCar;
    }

    @Delete(':id')
    async deleteCar(@Param('id') id: string): Promise<void> {
        const deletedCar = await this.carService.deleteCar(id);
        if (!deletedCar) {
            throw new NotFoundException('Car not found');
        }
    }
}