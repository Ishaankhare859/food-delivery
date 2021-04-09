const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const app = express();
const path = require('path');


//assests
app.use(express.static('public'));
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');
const PORT = process.envPORT || 3002;

app.get("/cart",(req, res) =>{
    res.render('customers/cart');
});

app.get("/signup",(req, res) =>{
    res.render('auth/signup');
});
app.get("/signin",(req, res) =>{
    res.render('auth/signin');
});
app.get("/",(req, res) =>{
    res.render('home');
});
app.listen(PORT, ()=>{
    console.log(`server started on ${ PORT }`);
});