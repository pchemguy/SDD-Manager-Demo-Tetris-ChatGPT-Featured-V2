/** Selected page-session values. No platform globals, storage, clocks or random inputs. */
export type GhostVisibilityMode = 'never' | 'lower-half' | 'always';
export type GeneralLockPolicy = 'failed-downward' | 'gravity-interval';
export type HardDropLockPolicy = 'general' | 'immediate';
export interface GameConfiguration {
 ghostVisibility: GhostVisibilityMode;
 nextPreviewEnabled: boolean;
 hardDropEnabled: boolean;
 holdEnabled: boolean;
 generalLockPolicy: GeneralLockPolicy;
 hardDropLockPolicy: HardDropLockPolicy;
}
export type RuleOptions = Pick<GameConfiguration, 'hardDropEnabled' | 'holdEnabled' | 'generalLockPolicy' | 'hardDropLockPolicy'>;
const defaults: GameConfiguration = {ghostVisibility:'always',nextPreviewEnabled:true,hardDropEnabled:true,holdEnabled:true,generalLockPolicy:'gravity-interval',hardDropLockPolicy:'general'};

/** Project a detached complete rule input, excluding the live display preferences. */
export function toRuleOptions(value: GameConfiguration): RuleOptions {
 const {hardDropEnabled,holdEnabled,generalLockPolicy,hardDropLockPolicy}=value;
 return {hardDropEnabled,holdEnabled,generalLockPolicy,hardDropLockPolicy};
}
function valid(key: string, value: unknown): boolean {
 if(key==='ghostVisibility')return ['never','lower-half','always'].includes(value as string);
 if(key==='generalLockPolicy')return ['failed-downward','gravity-interval'].includes(value as string);
 if(key==='hardDropLockPolicy')return ['general','immediate'].includes(value as string);
 return typeof value==='boolean';
}
/** One explicit context may outlive a view; fresh contexts always start with defaults. */
export function createConfiguration() {
 let selected={...defaults};
 const getSnapshot=():GameConfiguration=>({...selected});
 /** Validate the complete patch before committing; results never alias retained values. */
 const update=(patch:Partial<GameConfiguration>):GameConfiguration=>{
  if(patch===null||typeof patch!=='object'||Array.isArray(patch))throw new TypeError('Configuration patch must be an object');
  const candidate={...selected};
  for(const key of Reflect.ownKeys(patch)) {
   if(typeof key!=='string'||!Object.hasOwn(defaults,key))throw new TypeError('Unknown configuration setting');
   const value=Reflect.get(patch,key);
   if(!valid(key,value))throw new TypeError(`Invalid setting: ${key}`);
   Object.assign(candidate,{[key]:value});
  }
  selected=candidate;
  return getSnapshot();
 };
 return {getSnapshot,update};
}
export type ConfigurationController = ReturnType<typeof createConfiguration>;
