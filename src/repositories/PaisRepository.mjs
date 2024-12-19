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
    
    async insertarPais_1(req, res){
        try {
            const dataPais = req.body;
            const nuevoPais = new Pais(dataPais);
            const savePais = await nuevoPais.save();         
            return savePais;
        } catch (error) {          
            throw new Error("Error al insertar País");
        }
    }
    async insertarPais(req, res){
        try {
            const formData = req.body;
            let giniValue;
            try {
              giniValue = formData.gini ? JSON.parse(`{${formData.gini.replace(/'/g, '"')}}`) : undefined;
            } catch (error) {
              console.error("Error procesando el campo gini:", error.message);
              return res.status(400).json({ mensaje: "Formato de gini incorrecto" });
            }
            const nuevoPais = {
                name: {
                  nativeName: {
                    spa: {
                      official: formData.nombrePais,
                    },
                  },
                },
                capital: formData.capital.split(",").map(cap => cap.trim()), // Convertir en array
                borders: formData.borders.split(",").map(border => border.trim()), // Convertir en array
                area: Number(formData.area), // Convertir a número
                population: Number(formData.population), // Convertir a número
                gini: giniValue,
                timezones: formData.timezones.split(",").map(tz => tz.trim()), // Convertir en array
                creador: formData.creador,
              };
            //const nuevoPais = new Pais(dataPais);
            console.log("Datos recibidos del formulario:", req.body);
            console.log("Datos procesadoe del formulario:", formData);
            const savePais = await nuevoPais.save();         
            return savePais;
        } catch (error) {          
            throw new Error("Error al insertar País");
        }
    }

};

export default new PaisRepository();