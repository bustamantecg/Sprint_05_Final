import express from 'express';
import fs from 'fs';
import fetch from 'node-fetch'; // Necesario para descargar el archivo
import bodyParser from "body-parser";

import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';
import paisesRoutes from './routes/paisesRoutes.mjs';
import { insertarPaises} from "./scripts/insertarPaises.mjs";

import { handleFileOperations } from './scripts/fileHandler.mjs';

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

/************* llalmo al scripts insertarPaise una sola vez, para no duplicarlos ********* */
// Descargar, validar, procesar e insertar los datos en MongoDB
const apiUrl = "https://restcountries.com/v3.1/all";  
const outputPath = path.resolve('./data.json'); // Archivo descargado
const processedPath = path.resolve('./processed_data.json'); // Archivo procesado
(async () => {
  try {
    await handleFileOperations(apiUrl, outputPath, processedPath);
    await insertarPaises();
  } catch (error) {
    console.error("Error en el flujo principal:", error.message);
  }
})();

// Middleware para agregar navbarLinks
app.use((req, res, next) => {
  res.locals.navbarLinks = [
    { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
    { text: 'Acerca De', href: '/about', icon: '/icons/info.svg' },
    { text: 'Contacto', href: '/contact', icon: '/icons/contact.svg' }
  ];
  next();
});

/************ definiciones de los EndPoint *************************************************** */
//********************* Inicio *****************
app.get('/', (req, res) =>{
  res.render('index',{
    title:'Página Principal'
  })
});
//***************** Acerca De ******************
app.get('/about', (req, res) => {
  res.render('acercade', {
    title: 'Acerca De'}
  );
});
//********************** Contacto ***************
app.get('/contact', (req, res) =>{
  res.render('contacto',{
    title:'Contáctanos'
  });
});

//********************** endPoint de Paises*******
app.use('/pais', paisesRoutes);

// ******************** Inicia el servidor ************************************************************
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Ctrl+C para detener servidor`);
});