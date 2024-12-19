//import fs from "fs/promises";
import fs from 'fs';
import path from "path";
import Pais from "../models/Pais.mjs";

//import { MongoClient } from "mongodb";
//import Paises from "../models/PaisModel.mjs";
/*
const insertarPaises = async () => {  
  try {
    // Leer el archivo JSON
    const filePath = path.resolve("./processed_data.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const paises = JSON.parse(fileContent);

    // Insertar los datos
    const result = await Pais.insertMany(paises);
    console.log(`${result.length} países insertados correctamente.`);
  } catch (error) {
    console.error("Error al insertar países:", error);
    throw error; // Lanza el error
  }
};

export default insertarPaises;
*/

// Función para insertar países en la colección de MongoDB
/*
export const insertarPaises = async () => {
  const uri = "tu_cadena_de_conexion"; // Asegúrate de usar tu cadena de conexión a MongoDB
  const client = new MongoClient(uri);
  
  try {
    // Conexión a la base de datos
    await client.connect();
    console.log("Conectado a la base de datos.");

    const db = client.db("nombre_de_tu_base_de_datos");
    const collection = db.collection("paises");

    // Leer el archivo JSON procesado
    const filePath = path.resolve("./processed_data.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Insertar los documentos en la colección
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documentos insertados correctamente.`);
  } catch (error) {
    console.error("Error al insertar los países:", error.message);
  } finally {
    await client.close();
  }
};

*/

export const insertarPaises = async () => {
  try {
    // Leer el archivo JSON procesado
    const filePath = path.resolve("./processed_data.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Insertar los documentos en la colección
    const result = await Pais.insertMany(data);
    console.log(`${result.length} documentos insertados correctamente.`);
  } catch (error) {
    console.error("Error al insertar los países:", error.message);
    throw error; // Para identificar errores en la ejecución
  }
};