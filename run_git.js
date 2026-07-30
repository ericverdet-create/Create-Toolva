// Sprint 12 — Git init + commit (rutas absolutas, log en toolva/)
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT = 'C:\\Users\\usuario\\Desktop\\Proyectos\\toolva';
const LOG = path.join(PROJECT, 'git_log.txt');
const lines = [];

function log(msg) {
  console.log(msg);
  lines.push(String(msg));
}
function flush() {
  try { fs.writeFileSync(LOG, lines.join('\n'), 'utf8'); } catch(e) {}
}

log('=== TOOLVA GIT INIT ===');
log('Fecha: ' + new Date().toISOString());
log('PROJECT: ' + PROJECT);
log('Existe package.json: ' + fs.existsSync(path.join(PROJECT, 'package.json')));

// Buscar git con where (Windows) primero
let GIT = null;
try {
  const wherePath = execSync('where git', { encoding: 'utf8', stdio: 'pipe', timeout: 5000 });
  const foundPath = wherePath.trim().split('\n')[0].trim();
  log('where git: ' + foundPath);
  GIT = foundPath;
} catch (e) {
  log('where git fallo: ' + e.message.slice(0, 100));
}

// Si where no funcionó, buscar en rutas comunes
if (!GIT) {
  const gitCandidates = [
    'git',
    'C:\\Program Files\\Git\\cmd\\git.exe',
    'C:\\Program Files\\Git\\bin\\git.exe',
    'C:\\Program Files (x86)\\Git\\cmd\\git.exe',
    process.env.LOCALAPPDATA + '\\Programs\\Git\\cmd\\git.exe',
    process.env.LOCALAPPDATA + '\\Programs\\Git\\bin\\git.exe',
    'C:\\Users\\usuario\\AppData\\Local\\Programs\\Git\\cmd\\git.exe',
  ];
  for (const g of gitCandidates) {
    try {
      const v = execSync('"' + g + '" --version', { encoding: 'utf8', stdio: 'pipe', timeout: 5000 });
      log('Git OK: ' + g + ' -> ' + v.trim());
      GIT = g;
      break;
    } catch (e) {
      log('Git no en: ' + g);
    }
  }
}

if (GIT) {
  try {
    const v2 = execSync('"' + GIT + '" --version', { encoding: 'utf8', stdio: 'pipe', timeout: 5000 });
    log('Git version: ' + v2.trim());
  } catch(e) {}
}
flush();

if (!GIT) {
  log('ERROR: Git no encontrado. Instala desde https://git-scm.com/download/win');
  flush();
  process.exit(1);
}

// git init
const gitDir = path.join(PROJECT, '.git');
if (!fs.existsSync(gitDir)) {
  try {
    const o1 = execSync('"' + GIT + '" init', { cwd: PROJECT, encoding: 'utf8', stdio: 'pipe', timeout: 10000 });
    log('git init: ' + o1.trim());
    execSync('"' + GIT + '" branch -M main', { cwd: PROJECT, encoding: 'utf8', stdio: 'pipe', timeout: 5000 });
    log('git branch -M main: OK');
  } catch (e) {
    log('ERROR git init: ' + e.message);
    flush();
    process.exit(1);
  }
} else {
  log('.git ya existe');
}

// git add
try {
  const o2 = execSync('"' + GIT + '" add .', { cwd: PROJECT, encoding: 'utf8', stdio: 'pipe', timeout: 30000 });
  log('git add .: OK');
} catch (e) {
  log('ERROR git add: ' + e.message.slice(0, 200));
}

// git status
try {
  const o3 = execSync('"' + GIT + '" status --short', { cwd: PROJECT, encoding: 'utf8', stdio: 'pipe', timeout: 5000 });
  log('git status:\n' + o3.trim());
} catch (e) {
  log('status error: ' + e.message.slice(0, 100));
}

// git commit
try {
  const o4 = execSync(
    '"' + GIT + '" -c user.email="toolva@deploy.com" -c user.name="Toolva" commit -m "feat: toolva v1.0 - 40 herramientas + Fase 2 UX completa"',
    { cwd: PROJECT, encoding: 'utf8', stdio: 'pipe', timeout: 30000 }
  );
  log('git commit:\n' + o4.trim());
} catch (e) {
  log('git commit result: ' + e.message.slice(0, 300));
}

log('\n=== FIN ===');
flush();
console.log('Log guardado en: ' + LOG);
