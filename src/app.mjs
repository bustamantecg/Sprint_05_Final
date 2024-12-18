import express from 'express';
import fs from 'fs';
import fetch from 'node-fetch'; // Necesario para descargar el archivo
import bodyParser from "body-parser";

import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';
import paisesRoutes from './routes/paisesRoutes.mjs';
import insertarPaises from "./scripts/insertarPaises.mjs";

import { connectDB } from './config/dbConfig.mjs';

const app = express();
const port = 3000;
connectDB();

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method')); // Permite usar ?_method=PUT en formularios

// Configurar EJS como motor de templates
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//Configurar express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // archivo Base de layout

// Servir archivos estaticos
app.use(express.static(path.resolve('./public')));
//
// Función para descargar el archivo
const downloadFile = async (url, outputPath) => {
    const response = await fetch(url);
    const fileStream = fs.createWriteStream(outputPath);
  
    return new Promise((resolve, reject) => {
      response.body.pipe(fileStream);
      response.body.on('error', reject);
      fileStream.on('finish', resolve);
    });
  };
  
  // Descarga el archivo al iniciar el servidor
  const driveUrl = "https://restcountries.com/v3.1/all";
  //'https://drive.google.com/uc?id=171D5b7hXYAKisDpog79IsnJWQVBikZuY&export=download'; // Conversión del enlace a descarga directa
  const outputPath = './data.json';
  
  downloadFile(driveUrl, outputPath)
    .then(() => console.log('Archivo descargado correctamente.'))
    .catch(err => console.error('Error al descargar el archivo:', err));
// fin
///
// Filtrar y eliminar campos
// Filtrar y eliminar campos
const processFile = () => {
  try {
    const data = JSON.parse(fs.readFileSync(outputPath, 'utf-8')); // Lee el archivo descargado

    // Filtrar solo países que hablan español
    const filteredData = data.filter(item => item.languages && item.languages.spa === "Spanish");

    // Limpiar y agregar el campo "creador"
    const cleanedData = filteredData.map(item => {
      delete item.translations;
      delete item.tld;
      delete item.cca2;
      delete item.ccn3;
      delete item.cca3;
      delete item.cioc;
      delete item.idd;
      delete item.altSpellings;
      delete item.car;
      delete item.coatOfArms;
      delete item.postalCode;
      delete item.demonyms;
      delete item.fifa;
      delete item.flag;
      delete item.flags;
      delete item.maps;
      delete item.status;
      delete item.latlng;
      delete item.landlocked;
      delete item.startOfWeek;

      // Agregar propiedad "creador"
      item.creador = "Carlos Bustamante";

      return item; // IMPORTANTE: devolver el objeto modificado
    });

    // Guarda el resultado en un nuevo archivo
    fs.writeFileSync('./processed_data.json', JSON.stringify(cleanedData, null, 2));
    console.log('Archivo procesado y guardado como "processed_data.json".');
  } catch (error) {
    console.error('Error al procesar el archivo:', error.message);
  }
};

  // Validar los datops y Procesa el archivo una vez descargado
  const validateJSON = (filePath) => {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      JSON.parse(data); // Intenta parsear el JSON
      return true; // Si es válido
    } catch (error) {
      console.error(`Archivo JSON inválido en ${filePath}:`, error.message);
      return false;
    }
  };
  
  if (validateJSON(outputPath)) {
    setTimeout(processFile, 5000); // Procesa el archivo si es válido
  }
///

// Middleware para agregar navbarLinks
app.use((req, res, next) => {
  res.locals.navbarLinks = [
    { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
    { text: 'Acerca De', href: '/about', icon: '/icons/info.svg' },
    { text: 'Contacto', href: '/contact', icon: '/icons/contact.svg' }
  ];
  next();
});



/************* llalmo al scripts insertarPaise una sola vez, para no duplicarlos ********* */
/*
(async () => {  
  try {
    await insertarPaises();
    console.log("Script ejecutado correctamente.");
  } catch (error) {
    console.error("Error al ejecutar el script insertarPaises:", error);
  }
})();
*/
/************ definiciones de los EndPoint *************************************************** */



//********************* Inicio **************************************************** */
app.get('/', (req, res) =>{
  res.render('index',{
    title:'Página Principal'
  })
});
//***************** Acerca De ***************************************************** */
app.get('/about', (req, res) => {
  res.render('acercade', {
    title: 'Acerca De'}
  );
});
/********************** Contacto ******************************************** */
app.get('/contact', (req, res) =>{
  res.render('contacto',{
    title:'Contáctanos'
  });
});

app.use('/pais', paisesRoutes);
// ******************** Inicia el servidor ************************************
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Ctrl+C para detener servidor`);
});