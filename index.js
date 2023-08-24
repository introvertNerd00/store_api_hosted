require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const PORT = 5000;

const product_routes = require('./routes/products');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//middleware to set Router for products
app.use('/api/products', product_routes);

const start=async()=>{
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT,()=> console.log(`Server is listening on port ${PORT}...`));
    }
    catch(error){
        console.log(error);
    }
}

start();