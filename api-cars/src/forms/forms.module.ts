import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { Form, FormSchema } from './schema/form.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }])],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
