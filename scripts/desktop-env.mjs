/** Actual pinned runtime staging plus a finite dedicated Playwright Electron runner. */
import {spawnSync,spawn} from 'node:child_process';
import {resolve,basename,dirname} from 'node:path';
import {readFileSync,realpathSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
const prepared=spawnSync('python',['tests/fixtures/desktop_stage.py'],{stdio:'inherit'});
if(prepared.status!==0)process.exit(prepared.status??1);
const stageFile=resolve('artifacts/desktop-stage.json');
const stage=JSON.parse(readFileSync(stageFile,'utf8'));
const child=spawn(process.execPath,['node_modules/playwright/cli.js','test','--config=playwright.desktop.config.ts',...process.argv.slice(2)],{stdio:'inherit',env:{...process.env,DESKTOP_STAGE:stageFile}});
const timer=setTimeout(()=>child.kill('SIGTERM'),300000);
child.on('exit',code=>{clearTimeout(timer);try{if(dirname(realpathSync(stage.base))===realpathSync(tmpdir())&&basename(stage.base).startsWith('Classic Tetris Desktop ')&&readFileSync(resolve(stage.base,'.owned-test-stage'),'utf8')==='Classic Tetris desktop acceptance only')rmSync(stage.base,{recursive:true,force:true})}catch(error){console.error('Owned desktop stage cleanup failed:',error.message);process.exitCode=1}process.exitCode=process.exitCode??code??1});
