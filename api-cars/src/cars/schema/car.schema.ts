import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Car extends Document {
    @Prop({
        required: true
    })
    tipo: string;
    @Prop({
        required: true
    })
    marca: string;
    @Prop({
        required: true
    })
    modelo: string;
    @Prop({
        required: true
    })
    ano: number;
    @Prop({
        required: true
    })
    cor: string;
    @Prop({
        required: true
    })
    preco: number;
    @Prop({
        required: true
    })
    img: string;
};

export const CarSchema = SchemaFactory.createForClass(Car);