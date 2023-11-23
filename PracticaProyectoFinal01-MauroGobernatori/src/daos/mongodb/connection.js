import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://maurogobernatori:*****@cluster0.or4oc4e.mongodb.net/ecommerce';

export const initMongoDB = async () => {
    try{
        await mongoose.connect(connectionString);
        console.log('Connection to the database succesfull!');
    }catch (error){
        console.log(`ERROR => ${error}`);
    }
}