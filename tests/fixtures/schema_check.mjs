/** Independent consumer: compile the published schema afresh, without app/generated imports. */
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import {readFileSync} from 'node:fs';
const ajv=new Ajv2020({strict:true,allErrors:true});addFormats(ajv);
const schema=JSON.parse(readFileSync(process.argv[2],'utf8'));
const value=JSON.parse(readFileSync(process.argv[3],'utf8'));
const validate=ajv.compile(schema);
if(!validate(value))throw new Error(JSON.stringify(validate.errors));
// A negative control prevents a vacuous schema acceptance check.
const invalid=structuredClone(value);invalid.settings.holdEnabled='false';
if(validate(invalid))throw new Error('Schema accepted an invalid setting type');
console.log('Published schema independently validates actual download and rejects negative control');
