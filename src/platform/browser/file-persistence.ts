/** C-11: stage a complete import and publish settings/history only after checked browser effects. */
import {validateSnapshot} from '../../application/file-snapshot.js';
import type {Session} from '../../application/session.js';
import type {ConfigurationController} from '../../application/configuration.js';
import {prepareConfigurationRestore,type BrowserRestoreAccess} from './configuration-persistence.js';
export function restoreSnapshot(value:unknown,session:Session,configuration:ConfigurationController,access:BrowserRestoreAccess):void {
 const data=validateSnapshot(value),commitSelection=configuration.prepare(data.settings);
 // Capture current browser values at the final synchronous commit, never at picker-open time.
 const commitEffects=prepareConfigurationRestore(access,data.settings);
 session.replaceLeaderboard(data.results,()=>{commitEffects();commitSelection()});
}
