import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
const app = express();
const PORT = 3000;
app.use(express.urlencoded({extended:true}));
//db connection
mongoose.connect('mongodb://localhost:27017/imgUploader', ).then(()=>{
    console.log('DB Connected');
}).catch((err)=>{
    console.log(err);
})
//cloudinary.config
cloudinary.config({ 
    cloud_name: 'enter your cloud name here', 
    api_key: 'enter your api key here', 
    api_secret: 'enter your secret key here' 
});


app.get('/',(req,res)=>{    
    res.render('index.ejs',{url:null});
})
const storage = multer.diskStorage({
   // destination: './public/uploads',
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, file.fieldname +'-'+ uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

  const imgSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    public_id:{
        type:String,
        required:true
    },
   imgurl:{
        type:String,
        required:true
    }
  })
 const File = mongoose.model('Upload', imgSchema);
app.post('/upload', upload.single('file'), async (req, res)=> {
     try{
        const file = req.file.path;
        if(!file){
            return res.status(400).send('No file uploaded');
        }
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(file,{
            folder:'uploadsimg',
            

        })
        // Save file information to MongoDB
        const response = await File.create({
            filename:req.file.originalname,
            public_id:result.public_id,
            imgurl:result.secure_url
        })
        console.log("File uploaded successfully", response);
        res.render('index.ejs',{url:result.secure_url});
     }catch(err){
        res.status(500).send('Error uploading file');

     }
  })

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})