import express from 'express';
import {
      obtenerTodosLosPaisesController, 
      deletePaisController,
      FormularioNuevoPaisController,
      insertPaisController,
      getPaisController,
      updatePaisController } from '../controllers/paisesController.mjs'

import  paisesValidaciones  from '../validations/paisesValidations.mjs';
import { manejadorValidacionErroresPais } from "../middlewares/errorMiddleware.mjs";
  
const router = express.Router();

//*************  Listar todos los países  ************************************************
router.get('/todos', obtenerTodosLosPaisesController);

//********* Eliminamos un pais segun _id ************************************************
router.delete('/eliminar/porid/:id', deletePaisController);

//************ Formulario y alta de Pais  *************************************************
router.get('/crear', FormularioNuevoPaisController); 
router.post('/crear', (req, res, next) => {
    //console.log("Datos", req.body); // Muestra los datos enviados desde el formulario
    req.body.capital = req.body.capital.split(',').map(p => p.trim());
    next();
  }, paisesValidaciones(), manejadorValidacionErroresPais('addPais'), insertPaisController);

//************* Muestra y Edición de Pais  *************************************************
router.get('/editar/porid/:id', getPaisController);
router.put('/editar/porid/:id', 
  paisesValidaciones(), 
  manejadorValidacionErroresPais('editarPais'), 
  updatePaisController
); 
//*****************  FIN *******************************************************************
export default router;

