import multer from 'multer';
import path from 'path';

console.log(process.cwd());
// current working directory

console.log(import.meta.url);
// file URL of the current module


let picPath = process.cwd() + '/' +'temp-pic'
console.log(picPath)