import express from 'express';
import {
      obtenerTodosLosPaisesController, 
      deletePaisController,
      FormularioNuevoPaisController,
      insertPaisController,
      getPaisController,
      updatePaisController } from '../controllers/paisesController.mjs'

import  paisesValidaciones  from '../validations/paisesValidations.mjs';
import  manejadorValidacionErrores  from "../middlewares/errorMiddleware.mjs";

  
const router = express.Router();

//*************  Listar todos los países  ************************************************
router.get('/todos', obtenerTodosLosPaisesController);

//********* Eliminamos un pais segun _id ************************************************
router.delete('/eliminar/porid/:id', deletePaisController);

//************ Formulario y alta de Pais  *************************************************
router.get('/crear', FormularioNuevoPaisController); 
router.post('/crear', (req, res, next) => {
  console.log("Lo k viene es req.body - entro en updatePaisController");
  console.log(req.body);
    //console.log("Datos", req.body); // Muestra los datos enviados desde el formulario    
    req.body.capital = req.body.capital.split(',').map(p => p.trim());
    req.body.borders = req.body.borders.split(',').map(b => b.trim());
    //req.body.gini = { [2020]: Number(req.body.gini.split(':')[1]) };

    next();
  }, paisesValidaciones(), manejadorValidacionErrores('addPais'), insertPaisController);

//************* Muestra y Edición de Pais  *************************************************
router.get('/editar/porid/:id', getPaisController);
router.put('/editar/porid/:id', 
  paisesValidaciones(), 
  manejadorValidacionErrores('editarPais'), 
  updatePaisController
); 

//*****************  FIN *******************************************************************
export default router;

