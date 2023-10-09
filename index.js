//importation des modules
import express from "express";
import bodyParser  from "body-parser";
import axios from "axios";

//declaration des variables 
var app= express();
var port=3000;
var apiUrl="https://api.blockchain.com/v3/exchange";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//pour le routage vers la page d'acceuil
app.get("/",async(req,res)=>{
    try {
        const resultat= await axios.get(apiUrl+"/tickers");
        const valeur =resultat.data;
            res.render("index.ejs",{
                content:valeur,
            });
    } catch (error) {
        res.status(404).send(error.message);
    }
   

});

//pour chercher la crypto choisie par l'utilisateur

app.post("/chercher",async(req,res)=>{
    
    

   const resu=req.body.symbole;
   console.log(`le truc est ${resu}`);
   try {
        const result= await axios.get(apiUrl+`/tickers/${resu}`);
        console.log(result.data);
        res.render("index.ejs",{
            content1:result.data,
        });
   } catch (error) {
    
   }

});
//pour verifier si le port est bien configurer
app.listen(port, ()=>{
    console.log(`le port est le port ${port}`);
});