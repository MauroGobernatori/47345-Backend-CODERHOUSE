import { Schema, model } from 'mongoose';

export const productsCollectionName = 'products';

const productsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true},
    thumbnails: { type: Array, required: false }
});

export const ProductModel = model( productsCollectionName, productsSchema);