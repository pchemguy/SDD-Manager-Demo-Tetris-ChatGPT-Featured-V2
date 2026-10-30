/** Static deployment assets and canonical schema resolve below any hosting prefix. */
import {defineConfig} from 'vite';
import {mkdirSync,copyFileSync} from 'node:fs';
export default defineConfig({base:'./',plugins:[{name:'save-schema',closeBundle(){mkdirSync('dist/schemas',{recursive:true});copyFileSync('schemas/game-save.schema.json','dist/schemas/game-save.schema.json')}}]});
