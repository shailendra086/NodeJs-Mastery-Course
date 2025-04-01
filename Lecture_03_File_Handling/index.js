import { writeFile,appendFile } from 'fs/promises';
import {readFile} from 'fs/promises';

//Read file
const readFiles = async(filename)=>{
    const data = await  readFile(filename,'utf-8');
    console.log(data);
}


readFiles('sample.txt');


//create file 

const create_File = async(fileName,content)=>{
    await writeFile(fileName,content)
    console.log('File Created Successfully');
}

create_File('file1.txt','This is a new file created using fs module in nodejs');



//Append file

//add content to existing file
const apfile = async(fileName , content)=>{
    await appendFile(fileName,content);
    console.log('File Appended Successfully');

}

apfile('file1.txt'," I am Learnign the fs module in nodejs and added the cntent successfully");


//creating a folder
import { mkdir } from 'fs/promises';

const createFolder = async(folderName)=>{
    await mkdir(folderName,{recursive:true});
    console.log('Folder Created Successfully');
}

createFolder('src/components/javafile');