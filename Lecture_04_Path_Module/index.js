import path from 'path';


//join to or more file paths

//index.py
//test.java

const fullPath =path.join ('/path','index.py','test.java');
console.log(fullPath); // /path/index.py/test.java

//how to find the oringing or absolute path of a file

const absolutePath = path.resolve();
// console.log("we are currently working on ",absolutePath); // /home

//finde extension name

const  extensionName = path.extname('index.docs');
console.log("the extension name is ",extensionName); // .

if(extensionName === '.py'){
    console.log("this is a python file");
}
else console.log("this is not a python file");