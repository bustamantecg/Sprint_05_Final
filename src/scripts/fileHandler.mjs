import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// Función principal para manejar la descarga, validación y procesamiento
export const handleFileOperations = async (url, outputPath, processedPath) => {
  try {
    console.log('Iniciando descarga del archivo...');
    await downloadFile(url, outputPath);
    console.log('Archivo descargado correctamente.');

    if (validateJSON(outputPath)) {
      console.log('Archivo JSON válido. Procesando...');
      processFile(outputPath, processedPath);
    } else {
      console.error('Archivo JSON inválido. Operación abortada.');
    }
  } catch (error) {
    console.error('Error durante la operación:', error.message);
  }
};

// Descarga un archivo desde una URL
const downloadFile = async (url, outputPath) => {
  const response = await fetch(url);
  const fileStream = fs.createWriteStream(outputPath);

  return new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on('error', reject);
    fileStream.on('finish', resolve);
  });
};

// Valida si un archivo es un JSON válido
const validateJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    JSON.parse(data); // Intenta parsear el JSON
    return true; // Es válido
  } catch (error) {
    console.error(`Archivo JSON inválido en ${filePath}:`, error.message);
    return false;
  }
};

// Procesa el archivo descargado: filtra, limpia y guarda un nuevo archivo
const processFile = (inputPath, outputPath) => {
  try {
    const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8')); // Lee el archivo descargado

    // Filtrar solo países que hablan español
    const filteredData = data.filter(item => item.languages && item.languages.spa === "Spanish");

    // Limpiar y agregar el campo "creador"
    const cleanedData = filteredData.map(item => {
      const keysToRemove = [
        'translations', 'tld', 'cca2', 'ccn3', 'cca3', 'cioc', 'idd', 'altSpellings',
        'car', 'coatOfArms', 'postalCode', 'demonyms', 'fifa', 'flag', 'flags', 
        'maps', 'status', 'latlng', 'landlocked', 'startOfWeek'
      ];
      keysToRemove.forEach(key => delete item[key]);
      item.creador = "Carlos Bustamante"; // Agregar propiedad
      return item;
    });

    // Guarda el resultado en un nuevo archivo
    fs.writeFileSync(outputPath, JSON.stringify(cleanedData, null, 2));
    console.log(`Archivo procesado y guardado como "${outputPath}".`);
  } catch (error) {
    console.error('Error al procesar el archivo:', error.message);
  }
};