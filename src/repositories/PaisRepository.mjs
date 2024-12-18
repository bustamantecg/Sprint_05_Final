//import mongoose from 'mongoose';
import Pais from "../models/Pais.mjs"
import IRepository from "./IRepository.mjs";

class PaisRepository extends IRepository{

    async obtenerTodos(){
        return await Pais.find({});
        
    }

    async deletePaisById(id){
        try {
            return await Pais.findByIdAndDelete(id);
          } catch (error) {
            console.error('Error en el repositorio de eliminar Pais:', error.message);
            throw new Error(error.message);
          } 
      }
    
    async insertarPais(req, res){
        try {
            const dataPais = req.body;
            const nuevoPais = new Pais(dataPais);
            const savePais = await nuevoPais.save();         
            return savePais;
        } catch (error) {          
            throw new Error("Error al insertar País");
        }
    }
};

export default new PaisRepository();