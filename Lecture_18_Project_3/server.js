import express from 'express';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import multer from 'multer';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connecting to the database
mongoose.connect('mongodb://localhost:27017/imageuploadwithLogin').then(() => {
    console.log('Connected to MongoDB');

}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});


const PORT = 3000;



//cloudinary configuration
// Configuration
cloudinary.config({
    cloud_name: 'dkhkn3xh',
    api_key: 'khk',
    api_secret: 'fhhh' // Click 'View API Keys' above to copy your API secret
});

//Rendering the views of login Page
app.get('/', (req, res) => {
    res.render('login.ejs', { url: null });
})

//multer configuration
const storage = multer.diskStorage({
    // destination: './public/uploads',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

//user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    public_id: String,
    imgurl: String,
    filename: String,
});
const User = mongoose.model('User', userSchema);


app.get('/register', (req, res) => {
    res.render('register.ejs', { url: null });
});


app.post('/register', upload.single('file'), async (req, res) => {
    const { name, email, password } = req.body;
    const file = req.file.path;
    const result = await cloudinary.uploader.upload(file, {
        folder: 'userimages'
    });

    const db = await User.create({
        name,
        email,
        password,
        public_id: result.public_id,
        imgurl: result.secure_url,
        filename: result.original_filename,

    });
    res.redirect('/');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("body : ", req.body);
    console.log("Email : ", email);

    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('User not found');
    }
    else if (user.password !== password) {
        return res.status(400).send('Invalid password');
    }
    else {
        res.render('profile.ejs', { user });
    }
    console.log("User Details : ", user);
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});