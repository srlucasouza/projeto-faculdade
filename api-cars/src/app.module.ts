import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { FormsModule } from './forms/forms.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://srlucasbsouza:3fuhN0G50pkd1coj@cloud-car.xxwpi9y.mongodb.net/?retryWrites=true&w=majority&appName=cloud-car'), CarsModule, FormsModule ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {

}
