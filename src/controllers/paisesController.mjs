import { obtenerTodosLosPaises, deletePais, insertarPais}
  from '../services/paisServices.mjs';
import { renderizandoListaPaises, renderizandoPais }
  from '../views/responsiveView.mjs';
import Pais from '../models/paisModel.mjs';


//******** Listar todos los países ********************************/ 
export async function obtenerTodosLosPaisesController(req, res){
    //console.log(`Ruta llamada: ${req.method} ${req.url}`);
    const paises = await obtenerTodosLosPaises();
    const paisesRenderizados = renderizandoListaPaises(paises);
    res.render('paises_listado', {
                paisesRenderizados,    
                title: 'Listado'}
    );  
};

//********* Elimino un país por su _id **************************** */
export const deletePaisController = async (req, res) => {
    try {
      const { id } = req.params;
      // Eliminar el país por su ID
      const deletedPais = await deletePais(id);
      // Validar si el país existía o no
      if (!deletedPais) {
        return res.status(404).send('País no encontrado');
      }
      // Obtener la lista actualizada de países
      const paises = await obtenerTodosLosPaises();  
      // Renderizar la lista actualizada
      const paisesRenderizados = renderizandoListaPaises(paises);
      return res.render('paises_listado', { 
        paisesRenderizados,  
        title: 'Listado' 
      });
  
    } catch (error) {
      console.error('Error al eliminar el País:', error.message);
      res.status(500).send('Error al eliminar País');
    }
};
  
/* ********* Agregar Nuevo Pais **************************************** */
export const FormularioNuevoPaisController = (req, res) => {
  res.render('addPais', {title: 'Nuevo Pais', errores: [], datos: {} });
};

export const insertPaisController = async (req, res) => {  
  try {
    // Llama al servicio con los datos del formulario
    const nuevoPais = await insertarPais(req.body);
    res.redirect('/pais/todos'); // Redirige al endpoint del listado de pasises
  } catch (error) {    
    res.status(500).send('Error al guardar Pais'); // Manejo de errores
  }
};

/********************************************************************************** */