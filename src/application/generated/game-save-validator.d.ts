/** Structural signature for the generated standalone schema validator. */
declare const validate:((value:unknown)=>boolean)&{errors?:{keyword:string;instancePath?:string;message?:string}[]|null};
export default validate;
