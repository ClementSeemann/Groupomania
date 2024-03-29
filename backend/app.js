const express = require("express");
const mongoose = require("mongoose");
const app = express();

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const path = require("path");
const bodyParser = require('body-parser')
require('dotenv').config();

// Voire dans le fichier .env pour l'identifiant de connexion MongoDB
mongoose.connect(process.env.MONGO,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(express.json());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/post", postRoutes);
app.use("/api/auth", userRoutes);
module.exports = app;