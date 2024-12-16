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
  const driveUrl = 'https://drive.google.com/uc?id=171D5b7hXYAKisDpog79IsnJWQVBikZuY&export=download'; // Conversión del enlace a descarga directa
  const outputPath = './data.json';
  
  downloadFile(driveUrl, outputPath)
    .then(() => console.log('Archivo descargado correctamente.'))
    .catch(err => console.error('Error al descargar el archivo:', err));
  