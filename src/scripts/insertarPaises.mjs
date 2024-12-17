import fs from "fs/promises";
import path from "path";
import Pais from "../models/Pais.mjs";

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