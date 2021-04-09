const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const app = express();
const path = require('path');
app.get("/",(req, res) =>{
    res.render('home');
});
//assests
app.use(express.static('public'));
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');
const PORT = process.envPORT || 3001;

app.listen(PORT, ()=>{
    console.log(`server started on ${ PORT }`);
});