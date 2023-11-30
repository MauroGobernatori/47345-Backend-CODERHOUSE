// import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const productsCollectionName = 'products';

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    code: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true},
    thumbnails: { type: Array, required: false }
});

productsSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model( productsCollectionName, productsSchema )