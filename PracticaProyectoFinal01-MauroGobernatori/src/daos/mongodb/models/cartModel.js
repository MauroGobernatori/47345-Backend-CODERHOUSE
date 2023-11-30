import { Schema, model } from 'mongoose';

export const cartsCollectionName = 'carts';

const cartsSchema = new mongoose.Schema({
    products: [
        {
            _id: { type: Schema.Types.ObjectId, required: true, ref: 'products' },
            quantity: { type: Number, required: true}
        }
    ]
});

export const CartModel = model( cartsCollectionName, cartsSchema);