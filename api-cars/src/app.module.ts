import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://srlucasbsouza:bo6U52K6LBqkmnc9@cloud-car.xxwpi9y.mongodb.net/?retryWrites=true&w=majority&appName=cloud-car'), CarsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {

}
