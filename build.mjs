/** Copy existing static V4 assets to dist without transforming working code. */
import { mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';
const assets=['index.html','styles.css','app.js','content.js','adventure-content.js','icon.svg','manifest.webmanifest','sw.js'];
await mkdir('dist',{recursive:true});
for(const file of assets) await copyFile(file,join('dist',file));
console.log(`Built ${assets.length} LingoQuest V4 assets in dist/`);
