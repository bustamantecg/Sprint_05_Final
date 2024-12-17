import { validationResult } from 'express-validator';

// Manejador de errores genérico para diferentes vistas
export const manejadorValidacionErrores = (nombreVista) => {
  return (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      // Renderizar la vista específica con los errores
      return res.status(400).render(nombreVista, {
        errores: errores.array(), // Pasamos el array de errores a la vista
        datos: req.body, // Pasamos los datos enviados para mantenerlos en el formulario
      });
    }
    next();
  };
};
