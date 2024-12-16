// import Pais from "../models/paisModel.mjs";

import PaisRepository from '../repositories/PaisRepository.mjs';

export async function obtenerTodosLosPaises() {
    return await PaisRepository.obtenerTodos();
}


export async function deletePais(id) {
    try {
      const paisEliminado = await PaisRepository.deletePaisById(id);                                                     
      return paisEliminado;
    } catch (error) {
      console.error('Error en el servicio de eliminar Pais:', error.message);
      throw new Error(error.message);
    }
  }

  export const insertarPais = async (data) => {
    try {
      const nuevoPais = new Pais(data); // instancio un objeto Pais
      await nuevoPais.save(); // Guardo el objeto en BD 
      return nuevoPais; // Retornar el objeto guardado
    } catch (error) {
      throw new Error('Error al guardar Pais: ' + error.message);
    }
  };  