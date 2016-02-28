# web-personal

Estructura completa de mi sitio web personal. Contiene los archivos de desarrollo en app/ y los archivos de producción en public/

#### Requisitos:
<ol>
<li>Instalar Nodejs.</li>
<li>Instalar Python 2.7 como mínimo.</li>
<li>Instalar node-gyp: npm install -g node-gyp. (requisitos:  https://github.com/nodejs/node-gyp)</li>
<li>Instalar Bower: npm install gulp -g (-g es para que se instale de manera global).</li>
<li>Instalar Bower: npm install bower -g (-g es para que se instale de manera global).</li>
</ol>

#### Instalamos las dependencias:
<ol>
<li>Paquetes npm: npm install.</li>
<li>Paquetes bower: bower install.</li>
<li>Iniciar servidor web para el proyecto: npm start.</li>
</ol>

#### Iniciar el servidor web
Ejecutar el comando: gulp server. La carpeta que se muestra al iniciar el servidor se encuentra declara en el archivo Gulpfile en el task 'server'.

<br/>Nota: Si deseas desinstalar todos los paquetes npm locales puedes usar el siguiente comando desde el Git Bash:
npm uninstall `ls -1 node_modules | tr '/\n' ' '`

<br/>Contacto: jcahuanam@gmail.com
