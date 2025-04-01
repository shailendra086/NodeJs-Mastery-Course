import { Url } from "../Models/Url.js";
import shortid from "shortid";
export const shorturl = async(req, res) => {

    const longUrl = req.body.longurl;
    console.log(longUrl);
    const shortCode = shortid.generate();
    const shortUrl= `http://localhost:3000/${shortCode}`;
    //save to database
    
    await Url.create({
        longUrl: longUrl,
        shortCode: shortCode
    });
    console.log("New url",shortUrl);
    res.render('index.ejs',{shortUrl});   
}


export const getOriginalUrl = async(req, res) => {
   try{
    const shortCode = req.params.shortCode;
    const OriginalUrl  = await Url.findOne({shortCode});
    console.log("url from db",OriginalUrl);
    if(OriginalUrl){
        res.redirect(OriginalUrl.longUrl);
    }
    else{
        res.status(404).send('URL not found');
    }
   // console.log(OriginalUrl);
   }catch(err){
         return res.status(500).json({
            message: err.message});
   }

};