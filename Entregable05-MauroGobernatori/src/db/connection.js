import mongoose from "mongoose";

export const connectionString = "mongodb://127.0.0.1:27017/Gobernatori-BackendCoder-Entregable05";

try {
  await mongoose.connect(connectionString);
  console.log("Conectado a la base de datos de MongoDB");
} catch (error) {
  console.log(`ERROR => ${error}`);
}
