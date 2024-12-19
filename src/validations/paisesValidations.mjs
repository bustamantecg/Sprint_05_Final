import { body } from 'express-validator';

const paisesValidaciones = () => [
  body('nombrePais')
    .notEmpty().withMessage('El nombre oficial es requerido.')
    .isString().withMessage('El nombre oficial debe ser una cadena de texto.')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.')
    .trim()
    .escape(),

  body('capital')
    .notEmpty().withMessage('El campo capital es obligatorio.')
    .custom((value) => {
      const capitalsArray = Array.isArray(value) ? value : value.split(',').map(c => c.trim());
      if (!capitalsArray.every(c => c.length >= 3 && c.length <= 90)) {
        throw new Error('Cada capital debe tener entre 3 y 90 caracteres.');
      }
      return true;
    }),

  body('borders')
    .optional()
    .custom((value) => {
      const bordersArray = Array.isArray(value) ? value : value.split(',').map(b => b.trim());
      if (!bordersArray.every(b => /^[A-Z]{3}$/.test(b))) {
        throw new Error('Cada frontera debe ser un código de 3 letras en mayúsculas, como "BRA".');
      }
      return true;
    }),

  body('area')
    .notEmpty().withMessage('El campo área es obligatorio.')
    .isFloat({ gt: 0 }).withMessage('El área debe ser un número positivo.'),

  body('population')
    .notEmpty().withMessage('El campo población es obligatorio.')
    .isInt({ gt: 0 }).withMessage('La población debe ser un número entero positivo.'),

 /* body('gini')
    .optional()
    .custom((value) => {
      const giniValues = typeof value === 'object' ? Object.values(value) : [];
      if (!giniValues.every(g => g >= 0 && g <= 100)) {
        throw new Error('El índice GINI debe estar entre 0 y 100.');
      }
      return true;
    }),
    */
    body('gini')
    .optional()
    .custom((value) => {
      let giniObject;
      try {
        // Intentamos convertir el string a un objeto
        giniObject = typeof value === 'string' ? JSON.parse(value.replace(/'/g, '"')) : value;
      } catch (error) {
        throw new Error('El campo gini debe tener un formato válido, como {"2019": 42.7}');
      }
  
      // Validamos que los valores estén en el rango [0, 100]
      const giniValues = Object.values(giniObject);
      if (!giniValues.every(g => typeof g === 'number' && g >= 0 && g <= 100)) {
        throw new Error('El índice GINI debe estar entre 0 y 100.');
      }
      return true;
    }),
];

export default paisesValidaciones;
