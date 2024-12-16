import Pais from "../models/paisModel.mjs";
import IRepository from "./IRepository.mjs";
import mongoose from 'mongoose';

class PaisRepository extends IRepository{

    async obtenerTodos(){
        // return await Pais.find({});
        return await Pais.find().sort({ 'name.official': 1 });
    }

    async deletePaisById(id){
        try {
            return await Pais.findByIdAndDelete(id);
          } catch (error) {
            console.error('Error en el repositorio de eliminar Pais:', error.message);
            throw new Error(error.message);
          } 
      }
};

export default new PaisRepository();