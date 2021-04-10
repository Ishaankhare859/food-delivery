const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const expressLayout = require('express-ejs-layouts');
const app = express();
const path = require('path'); 

//database connection
const url = 'mongodb+srv://ishaan:pr25jNshausztS0R@cluster0.vuhnr.mongodb.net/fooddelivery?retryWrites=true&w=majority';
mongoose.connect(url,{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:true});
const  connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('connected');
})
.catch(err=>{
    console.log('NOT CONNECTED ');
});
//assests
app.use(express.static('public'));
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');
const PORT = process.envPORT || 3002;

require('./routes/web')(app);

app.listen(PORT, ()=>{
    console.log(`server started on ${ PORT }`);
});