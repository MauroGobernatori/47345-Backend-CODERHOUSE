import { Schema, model } from 'mongoose';

export const cartsCollectionName = 'carts';

const cartsSchema = new Schema({
    products: { type: Array, required: true }
});

export const CartModel = model( cartsCollectionName, cartsSchema);