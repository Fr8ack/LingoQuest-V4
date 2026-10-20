/** Minimal dependency-free web server for the existing Vanilla JS app. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.argv.includes('--dist') ? join(process.cwd(), 'dist') : process.cwd();
const files = new Set(['index.html','styles.css','app.js','content.js','adventure-content.js','icon.svg','manifest.webmanifest','sw.js']);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const ext = (name) => name.endsWith('.webmanifest')?'.webmanifest':name.slice(name.lastIndexOf('.'));
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';
createServer(async (req,res) => {
  let name;
  try {
    const raw = new URL(req.url || '/', 'http://localhost').pathname;
    const path = decodeURIComponent(raw);
    name = path === '/' ? 'index.html' : path.replace(/^\//,'');
  } catch { res.writeHead(400);res.end('Bad request');return; }
  if (!files.has(name)) {res.writeHead(404);res.end('Not found');return;}
  try {
    const f = join(root,name);
    const st = await stat(f);
    if (!st.isFile()) throw new Error('Not a file');
    const data = await readFile(f);
    res.writeHead(200,{'Content-Type':mime[ext(name)]||'application/octet-stream','Content-Length':data.length,'Cache-Control':'no-store'});
    if (req.method==='HEAD') res.end(); else res.end(data);
  } catch { res.writeHead(404);res.end('Not found'); }
}).listen(port,host,() => console.log(`LingoQuest V4 ready at http://localhost:${port}`));
