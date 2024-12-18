import { validationResult } from 'express-validator';

// Manejador de errores genérico para diferentes vistas
/*
const manejadorValidacionErrores = (nombreVista) => {
  return (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      // Renderizar la vista específica con los errores
      return res.status(400).render(nombreVista, {
        errores: errores.array(),
        datos: req.body,
      });
    }
    next();
  };
};
*/


const manejadorValidacionErrores = (vista) => (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const mensajes = errores.array(); // Array de mensajes de error
    return res.status(400).render(vista, { 
      title: 'Editar País', 
      pais: req.body, // Devuelve los datos ingresados
      errores: mensajes 
    });
  }
  next();
};
export default manejadorValidacionErrores;
