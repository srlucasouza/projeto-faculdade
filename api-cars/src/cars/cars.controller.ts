import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './schema/car.schema';

@Controller('/cars')
export class CarsController {
    constructor(private readonly carService: CarsService){}

    @Post()
    async createCar(@Body() car: Car){
        return this.carService.createCar(car)
    }

    @Get()
    async getAll(){
        return this.carService.getAll()
    }

    @Get('/:id')
    async getCar(@Param('id') id: string){
        return this.carService.getCar(id);
    }

    @Put('/:id')
    async updateCar(@Param('id') id: string, @Body() car: Car){
        return this.carService.updateCar(id, car);
    }

    @Delete('/:id')
    async deleteCar(@Param('id') id: string){
        return this.carService.deleteCar(id)
    }

}
