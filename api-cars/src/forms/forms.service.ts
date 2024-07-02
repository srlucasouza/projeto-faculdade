import { Injectable } from '@nestjs/common';
import { Form } from './schema/form.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FormsService {

  constructor(@InjectModel(Form.name) private formModel: Model<Form>) { }
  async createCar(form: Form) {
    const newForm = new this.formModel({
      telefone: form.telefone,
      email: form.email,
      formaPagamento: form.formaPagamento,
      carId: form.carId
    });
    return await newForm.save();
  }

  async getAllForm() {
    return this.formModel.find().exec();
  }

  async getForm(id) {
    return this.formModel.findOne({ _id: id }).exec();
  }

  async updateForm(id, form) {
    return this.formModel.findByIdAndUpdate(id, form).exec();
  }

  async deleteForm(id) {
    return this.formModel.findByIdAndDelete(id).exec();
  }
}
