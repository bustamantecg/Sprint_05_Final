# Sprint_05_Final
Instrucciones para Instalar las Dependencias y Ejecutar la Aplicación
=====================================================================

* Descargar e instalar Visual Estudio Code (VSC), dirigete a https://code.visualstudio.com
una vez alli click en botón de "Download for Windows" se descargara el archivo y sigue las intrucciones de instalación.
 (requiere windows 10 o superior y 64 bits).

* Node.js (versión 16 o superior): Descárgalo desde [nodejs.org.](https://node.org) e instalra.

* MongoDB: usamos esta base de datos NoSQL, para la persistencia de los datos.
        Localmente: Instala MongoDB Compass y define la conexión.
        Asegúrate de que el servicio MongoDB esté funcionando.
        En la nube: Si usas MongoDB Atlas, configura la URI de conexión en tu aplicación.

* Clonar o descargar el proyecto:
=================================
* El proyecto se encuentra en un repositorio publico de Github :
https://github.com/bustamantecg/Sprint_05_Final.git 
puedes clonar o descargarlo como archivo zip.

* Abre VSC.
    -> selecciona la carpeta de trabajo
    -> Abre una terminar: menú principal: Terminal -> Nueva Terminal.
    -> estando en la terminal, pasate al direcorio src, con: cd src 
    -> instala las siguiente dependencias:
       = npm install express
       = npm install express-validator
       = npm install ejs
       = npm install express-ejs-layouts
       = npm install mongoose
       = npm install method-override
       = npm install node-fetch
       = npm install body-parser



Objetivos:
==========

Tecnologias Utilizadas:
=======================

* Ejecutar aplicación:
======================
    -> en la terminal ejecuta el siguiente comando para levantar el servidor:
        node app.mjs
    -> Si todo va bien, verás en la terminal: http://localhost:3000
        este enlace ejecuta la aplicación web, puedes copiarlo y pegarlo
        en la barra de direccón de tu navegador favorito.

Consideraciones especiales:
===========================

