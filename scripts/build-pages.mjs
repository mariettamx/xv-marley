import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'dist');
const docsDir = path.join(rootDir, 'docs');
const baseHref = process.env.GITHUB_PAGES_BASE_PATH || "/xv-marley/";

async function ensureDirectory(dir) {
  await mkdir(dir, { recursive: true });
}

async function copyStaticFiles() {
  await ensureDirectory(docsDir);
  await rm(docsDir, { recursive: true, force: true });
  await mkdir(docsDir, { recursive: true });

  const entries = await readdir(sourceDir);
  for (const entry of entries) {
    await cp(path.join(sourceDir, entry), path.join(docsDir, entry), { recursive: true, force: true });
  }
}

function pickAsset(files, pattern) {
  return files.filter((file) => pattern.test(file)).sort((a, b) => b.localeCompare(a))[0] || null;
}

async function writeEntryHtml() {
  const assetsDir = path.join(docsDir, 'assets');
  const files = await readdir(assetsDir);
  const jsAsset = pickAsset(files, /^index-.*\.js$/);
  const cssAsset = pickAsset(files, /^styles-.*\.css$/);

  const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Invitación de XV años de Marley" />
    <base href="${baseHref}" />
    <title>Marley · XV Años</title>
    ${cssAsset ? `<link rel="stylesheet" href="./assets/${cssAsset}" />` : ''}
  </head>
  <body>
    <div id="root"></div>
    ${jsAsset ? `<script type="module" src="./assets/${jsAsset}"></script>` : ''}
  </body>
</html>
`;

  await writeFile(path.join(docsDir, 'index.html'), html, 'utf8');

  const notFoundHtml = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=./" />
    <title>Redirecting…</title>
  </head>
  <body></body>
</html>
`;

  await writeFile(path.join(docsDir, '404.html'), notFoundHtml, 'utf8');
}

await copyStaticFiles();
await writeEntryHtml();
