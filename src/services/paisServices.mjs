import PaisRepository from '../repositories/PaisRepository.mjs';
import Pais from '../models/Pais.mjs';

//************************************************************************** */
export async function obtenerTodosLosPaises() {
    return await PaisRepository.obtenerTodos();
}

//************************************************************************** */
export async function deletePais(id) {
    try {
      const paisEliminado = await PaisRepository.deletePaisById(id);                                                     
      return paisEliminado;
    } catch (error) {
      console.error('Error en el servicio de eliminar Pais:', error.message);
      throw new Error(error.message);
    }
  };

//**************** Alta ****************************************************** */
export async function insertarPais(req, res){
  return await PaisRepository.insertarPais(req, res);
};
/*
export const insertarPais = async (data) => {
    try {
      const nuevoPais = new Pais(data); // instancio un objeto Pais
      await nuevoPais.save(); // Guardo el objeto en BD 
      return nuevoPais; // Retornar el objeto guardado
    } catch (error) {
      throw new Error('Error al guardar Pais: ' + error.message);
    }
  };  
*/
//******** Update ******************************************
   export const getPaisById = async (id) => {
    try {
      return await Pais.findById(id); // Busca en la base de datos
    } catch (error) {
      throw new Error('Error al obtener País: ' + error.message);
    }
  };

  export const updatePais = async (id, updateData) => {    
    try {
      return await Pais.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }); // Actualiza
    } catch (error) {
      throw new Error('Error al actualizar País: ' + error.message);
    }
  };

  //********************************************************** */