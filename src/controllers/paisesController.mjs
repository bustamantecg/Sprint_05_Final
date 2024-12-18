import { obtenerTodosLosPaises, deletePais, insertarPais, getPaisById, updatePais}
  from '../services/paisServices.mjs';
import { renderizandoListaPaises, renderizandoPais }
  from '../views/responsiveView.mjs';



//******** Listar todos los países ********************************/ 
export async function obtenerTodosLosPaisesController(req, res){
    //console.log(`Ruta llamada: ${req.method} ${req.url}`);
    const paises = await obtenerTodosLosPaises();

    paises.forEach((pais) => {
      if (pais.gini instanceof Map) {
        pais.gini = Object.fromEntries(pais.gini); // Transforma el Map en un objeto
      }
    });


    const paisesRenderizados = renderizandoListaPaises(paises);
    res.render('paises_listado', {paisesRenderizados, title:'Listado de Paises'}
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
      res.render('paises_listado', { paisesRenderizados, title: 'Listado' });  
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
    // Llama al servicio.insertarPais con los datos del formulario
    const nuevoPais = await insertarPais(req.body);
    res.redirect('/pais/todos'); // Redirige al endpoint del listado de pasises
  } catch (error) {    
    res.status(500).send('Error al guardar Pais'); // Manejo de errores
  }
};

/****************** UpDate Pais ************************************************* */
export const getPaisController = async (req, res) => {  
  try {
    const { id } = req.params;
    const pais = await getPaisById(id); // Llama al servicio para obtener los datos
    if (!pais) {
      return res.status(404).send('País no encontrado');
    }    
    // Renderiza el formulario con los datos del país y un array vacío para errores
    res.render('editarPais', { 
      title: 'Editar País', 
      pais, 
      errores: [] // Pasar un array vacío si no hay errores
    });
  } catch (error) {    
    res.status(500).send('Error al cargar los datos del País');
  }
};



export const updatePaisController = async (req, res) => {

  try {
    // Extraer el ID del parámetro de la URL
    const { id } = req.params;

    // Extraer los datos validados del formulario
    const {
      name,
      capital,
      borders,
      area,
      population,
      gini,
      independent,
      unMember,
      timezones,
      creador,
    } = req.body;

    // Buscar y actualizar el país por ID
    const paisActualizado = await Pais.findByIdAndUpdate(
      id, // ID del país a actualizar
      {
        name,
        capital: Array.isArray(capital) ? capital : capital.split(',').map(c => c.trim()),
        borders: Array.isArray(borders) ? borders : borders.split(',').map(b => b.trim()),
        area,
        population,
        gini,
        independent: independent === 'true', // Convertir a booleano si es necesario
        unMember: unMember === 'true', // Convertir a booleano si es necesario
        timezones: Array.isArray(timezones)
          ? timezones
          : timezones.split(',').map(tz => tz.trim()),
        creador,
        updatedAt: Date.now(), // Actualizar la fecha de modificación
      },
      { new: true, runValidators: true } // Opciones: devolver el documento actualizado y validar
    );

    // Validar si el país existe
    if (!paisActualizado) {
      return res.status(404).render('editarPais', {
        errores: [{ msg: 'El país no fue encontrado.' }],
        datos: req.body,
      });
    }

    // Redirigir o enviar respuesta de éxito
    //res.redirect(`/paises/${id}`); // Redirige a la vista del país actualizado
    res.redirect('/pais/todos'); // Redirige a la vista del país actualizado
  } catch (error) {
    console.error('Error al actualizar el país:', error);
    return res.status(500).render('editarPais', {
      errores: [{ msg: 'Ocurrió un error en el servidor.' }],
      datos: req.body,
    });
  }
};