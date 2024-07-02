import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Form extends Document {
    @Prop({
        required: true
    })
    telefone: string;
    @Prop({
        required: true
    })
    email: string;
    @Prop({
        required: true
    })
    formaPagamento: string;
    @Prop({
        required: true
    })
    carId: string;
};

export const FormSchema = SchemaFactory.createForClass(Form);