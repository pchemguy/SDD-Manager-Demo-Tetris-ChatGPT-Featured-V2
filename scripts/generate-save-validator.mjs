/** Deterministically compile the canonical schema; --check rejects stale runtime code. */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import standaloneCode from 'ajv/dist/standalone/index.js';
import {_} from 'ajv/dist/compile/codegen/index.js';
const schema=JSON.parse(readFileSync('schemas/game-save.schema.json','utf8'));
const ajv=new Ajv2020({allErrors:false,strict:true,code:{source:true,esm:true,formats:_`formats`}});
addFormats(ajv,{mode:'full'});
const source='/** Generated from schemas/game-save.schema.json. Run npm run generate:save-validator. */\n'+
 "import {fullFormats as formats} from 'ajv-formats/dist/formats.js';\n"+standaloneCode(ajv,ajv.compile(schema))+'\n';
const target='src/application/generated/game-save-validator.js';
if(process.argv.includes('--check')) {
 if(readFileSync(target,'utf8')!==source)throw new Error('Stale save validator; run npm run generate:save-validator');
 console.log('Canonical save-schema validator is current');
}else{mkdirSync('src/application/generated',{recursive:true});writeFileSync(target,source);console.log('Generated save-schema validator')}
