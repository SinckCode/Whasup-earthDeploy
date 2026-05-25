// src/controllers/mainController.js
const { exec } = require('child_process');

const SECRET = process.env.DEPLOY_SECRET || 'cambia_este_token_super_secreto';

// Paths
const PROJECTS_PATH = '/home/onesto/Proyectos';
const FRONTEND_PATH = PROJECTS_PATH + '/whatsup-earth';
const BACKEND_PATH = PROJECTS_PATH + '/whatsup-earth-Backend';
const DEST_PATH = '/var/www/whatsup-earth';
const SERVICE_RELOAD = 'apache2';

// NVM setup prefix (Node 22)
const NVM_PREFIX = 'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 22 &&';

exports.deploy = (req, res) => {
  // 1. Validar token
  const auth = req.headers['authorization'] || '';
  const token = auth.replace(/^Bearer\s*/i, '').trim();

  if (token !== SECRET) {
    return res.status(403).send('Acceso no autorizado');
  }

  // 2. Comandos de deploy completo
  const commands = [
    // Frontend: pull, install, build web, copy to apache
    'cd ' + FRONTEND_PATH,
    'git pull origin main',
    NVM_PREFIX + ' npm install',
    NVM_PREFIX + ' VITE_API_URL=https://api-whatsupearth.angelonesto.com/api npx vite build --config vite.config.web.js',
    'sudo cp ' + DEST_PATH + '/.htaccess /tmp/htaccess_backup 2>/dev/null || true',
    'sudo rm -rf ' + DEST_PATH + '/*',
    'sudo cp -a dist/. ' + DEST_PATH + '/',
    'sudo cp /tmp/htaccess_backup ' + DEST_PATH + '/.htaccess 2>/dev/null || true',
    'sudo systemctl reload ' + SERVICE_RELOAD,

    // Backend: pull, rebuild docker, migrate
    'cd ' + BACKEND_PATH,
    'git pull origin main',
    'cd ' + PROJECTS_PATH,
    'docker compose build --no-cache backend',
    'docker compose up -d backend',
    'sleep 5',
    'docker compose exec -e PG_USER=whatsup -e PG_PASSWORD=postgres123 -e PG_DB=whatsup_earth -e PG_HOST=postgres -e PG_PORT=5432 -T backend npx sequelize-cli db:migrate'
  ];

  const fullCommand = commands.join(' && ');
  console.log('📜 Ejecutando deploy completo...');

  exec(fullCommand, { timeout: 300000 }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ ERROR:', error.message);
      return res.status(500).send('Error en deploy:\n' + error.message);
    }

    console.log('✅ Deploy completado');
    if (stdout) console.log('STDOUT:', stdout);
    if (stderr) console.warn('STDERR:', stderr);

    return res.send('Deploy completado correctamente 🚀');
  });
};
