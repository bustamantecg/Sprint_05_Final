import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      //const connection = await mongoose.connect('mongodb+srv://bustamantecg:Timpa.2026@clusterpais.laimf.mongodb.net/paises_db?retryWrites=true&w=majority', {
        const connection = await mongoose.connect('mongodb+srv://bustamantecg:Timpa.2026@clusterpais.laimf.mongodb.net/paises_db', {
        serverSelectionTimeoutMS: 60000, // Tiempo de espera para conectarse al servidor
        socketTimeoutMS: 60000, // Tiempo de espera para operaciones individuales
      });
      console.log('Conexión exitosa a MongoDB');
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
      process.exit(1);
    }
  };

  // mongodb+srv://bustamantecg:<db_password>@clusterpais.laimf.mongodb.net/
 
  //mongodb+srv://bustamantecg:Timpa.2026@clusterpais.laimf.mongodb.net/paises_db?retryWrites=true&w=majority