import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as fs from 'fs';

import { renderModuleFactory } from '@angular/platform-server';
import { AppServerModuleNgFactory } from './dist/ssr-playground-server/main';

const routes = [
  '/',
  '/dashboard',
  '/item/bed',
  '/item/book',
  '/item/garden',
  '/item/fridge',
  '/item/computer',
  '/item/livingroom'
];

const distFolder = path.join(process.cwd(), 'dist', 'ssr-playground');
const indexHtml = fs.readFileSync(path.join(distFolder, 'index.html')).toString();

// Run the render process for each of the routes
routes.forEach(route => renderRoute(indexHtml, route));

// This is the function that does the rendering
// and saves the result to the file system
async function renderRoute(document: string, route: string) {
  const html = await renderModuleFactory(AppServerModuleNgFactory, { document, url: route });

  const folder = path.join(distFolder, route);
  mkdirp.sync(folder);
  fs.writeFileSync(path.join(folder, 'index.html'), html);
}
