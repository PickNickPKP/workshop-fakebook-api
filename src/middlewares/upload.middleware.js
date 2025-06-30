import multer from 'multer';
import path from 'path';

console.log(process.cwd());
// current working directory

console.log(import.meta.url);
// file URL of the current module


// let picPath = process.cwd() + '/' +'temp-pic'
// console.log(picPath)
//some os (windows) don't like the path with / so we use path.join

const dest = path.join(process.cwd() , 'temp-pic')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);      //null means no error, dest is the directory where files will be stored
  },
  filename: (req, file, cb) => {      
    let fileExt = path.extname(file.originalname); // get the file extension
    let fileName = `pic_${Date.now()}_${Math.round(Math.random()*100+1)}${fileExt}`; // create a unique file name
    cb(null, fileName); // null means no error, fileName is the name of the file to be saved
  }
});

export default multer({storage: storage})