import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Call extends Document {
    @Prop({
        required: true,
        ref: "User"
    })
    callerId: string;

    @Prop({
        required: true,
        ref: "User"
    })
    receiverId: string;

    @Prop({ required: true })
    status: string;
}

export const CallSchema = SchemaFactory.createForClass(Call);