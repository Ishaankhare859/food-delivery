const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const expressLayout = require('express-ejs-layouts');
const app = express();
const path = require('path'); 
const flash = require('express-flash');
const Mongodbstore = require('connect-mongo');
const dotenv = require("dotenv");

dotenv.config();
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
//session-store
// let mongoStore = new Mongodbstore({
//     mongooseConnection: connection,
//     collection: 'sessions'  
// })
// //session config
app.use(session({
    secret: process.env.COOKIES_SECRET,
    store: Mongodbstore.create({
        //mongoUrl: url, collection: 'sessions' 
      mongoUrl:  url,
            collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))
//global middleware
app.use((req,res, next)=>{
    res.locals.session = req.session;
    next();
})

//assests
app.use(express.static('public'));
app.use(expressLayout);
app.use(express.json());
app.use(flash());
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');
const PORT = process.envPORT || 3002;

require('./routes/web')(app);

app.listen(PORT, ()=>{
    console.log(`server started on ${ PORT }`);
});