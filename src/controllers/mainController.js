// src/controllers/mainController.js
const { exec } = require('child_process');

const SECRET = process.env.DEPLOY_SECRET || 'cambia_este_token_super_secreto';

// Config de What’s Up Earth en ESTA VM
const REPO_PATH = '/home/onesto/Proyectos/whatsup-earth';   // <- ruta del repo
const DEST_PATH = '/var/www/whatsup-earth';                 // <- carpeta pública
const BUILD_DIR = 'dist';                                   // Vite/React genera "dist"
const SERVICE_RELOAD = 'apache2';                           // o "nginx" si usas Nginx

exports.deploy = (req, res) => {
  // 1. Validar token
  const auth = req.headers['authorization'] || '';
  const token = auth.replace(/^Bearer\s*/i, '').trim();

  console.log('📩 Auth recibido:', auth);
  console.log('🔐 Token limpio:', `"${token}"`);
  console.log('🔑 SECRET desde .env:', `"${SECRET}"`);

  if (token !== SECRET) {
    return res.status(403).send('Acceso no autorizado');
  }

  // 2. Comandos de deploy
  const commands = [
    `cd ${REPO_PATH}`,
    'git pull origin main',
    'npm install',
    'npm run build',
    `rm -rf ${DEST_PATH}/*`,
    `cp -a ${BUILD_DIR}/. ${DEST_PATH}/`,
    `sudo systemctl reload ${SERVICE_RELOAD}`
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
