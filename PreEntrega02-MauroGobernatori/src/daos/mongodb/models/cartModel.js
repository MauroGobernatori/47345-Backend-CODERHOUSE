import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const cartsCollectionName = 'carts';

const cartsSchema = new mongoose.Schema({
    products: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' },
            quantity: { type: Number, required: true}
        }
    ]
});

cartsSchema.plugin(mongoosePaginate);

cartsSchema.pre('find', function(){
    this.populate('products')
});

export const CartModel = mongoose.model( cartsCollectionName, cartsSchema);