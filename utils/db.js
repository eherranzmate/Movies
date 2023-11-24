const mongoose = require('mongoose');
require('dotenv').config();

mongoose
.connect(process.env.MONGODB_URL,{
})
.then(async()=> {
    console.log('Conectado a MongoDB Atlas');
})
.catch((err) => console.log('Error conectando'))
