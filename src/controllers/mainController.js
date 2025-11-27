// src/controllers/mainController.js
const { exec } = require('child_process');

const SECRET = process.env.DEPLOY_SECRET || 'cambia_este_token_super_secreto';

// Como en esta VM solo vas a manejar What’s Up Earth, dejamos un solo proyecto.
// Si después quieres añadir más, aquí se agrega otro objeto.
const PROJECTS = {
  whatsup: {
    REPO_PATH: '/home/onesto/Proyectos/whatsup-earth', // <-- ruta del repo en esta VM
    DEST_PATH: '/var/www/whatsup-earth',               // <-- carpeta pública
    BUILD_DIR: 'dist',                                 // Vite/React genera "dist"
    USE_PM2: false,
    SERVICE_RELOAD: 'apache2'                          // o 'nginx' si usas Nginx
  }
};

exports.deploy = (req, res) => {
  const auth = req.headers['authorization'] || '';
  const token = auth.replace(/^Bearer\s*/i, '').trim();

  console.log('📩 Auth recibido:', auth);
  console.log('🔐 Token limpio:', `"${token}"`);
  console.log('🔑 SECRET desde .env:', `"${SECRET}"`);

  if (token !== SECRET) {
    return res.status(403).send('Acceso no autorizado');
  }

  const projectKey = req.params.project;
  const project = PROJECTS[projectKey];

  if (!project) {
    return res.status(404).send(`Proyecto desconocido: ${projectKey}`);
  }

  const { REPO_PATH, DEST_PATH, BUILD_DIR, USE_PM2, SERVICE_RELOAD } = project;

  const commands = [
    `cd ${REPO_PATH}`,
    'git pull origin main',
    'npm install',
    'npm run build',
    `rm -rf ${DEST_PATH}/*`,
    `cp -a ${BUILD_DIR}/. ${DEST_PATH}/`,
    `sudo systemctl reload ${SERVICE_RELOAD}`,
    USE_PM2
      ? 'pm2 restart whatsup-earth'
      : 'echo "Sin PM2, solo frontend estático"'
  ];

  const fullCommand = commands.join(' && ');
  console.log('📜 Ejecutando comando:\n', fullCommand);

  exec(fullCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ ERROR:', error.message);
      return res.status(500).send(`Error en deploy:\n${error.message}`);
    }

    console.log('✅ STDOUT:\n', stdout);
    if (stderr) console.warn('⚠️ STDERR:\n', stderr);

    return res.send('Deploy completado correctamente 🚀');
  });
};
