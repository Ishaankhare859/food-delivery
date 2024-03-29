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
const passport = require('passport');
const Emitter = require('events')
dotenv.config();
//database connection
mongoose.connect(process.env.Mongo_URL,{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:true});
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

//eventemitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter);
// //session config
app.use(session({
    secret: process.env.COOKIES_SECRET,
    store: Mongodbstore.create({
        //mongoUrl: url, collection: 'sessions' 
      mongoUrl:  process.env.Mongo_URL,
            collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

//passport config
const passportInit = require('./app/config/passport')
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
//global middleware
app.use((req,res, next)=>{
    res.locals.session = req.session;
    res.locals.user = req.user;
    res.locals.order = req.order;

    next();
})
//assests
app.use(express.static('public'));
app.use(expressLayout);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');
const PORT = process.envPORT || 3002;

require('./routes/web')(app);
app.use((req,res)=>{
    res.status(404).render('errors/404');
})
const server= app.listen(PORT, ()=>{
    console.log(`server started on ${ PORT }`);
});

//socketio connection
const io = require('socket.io')(server);
io.on('connection',(socket)=>{
    socket.on('join', (orderId)=>{
        socket.join(orderId);
        console.log(orderId);
    })
    console.log(socket.id)
})
eventEmitter.on('orderUpdated', (data)=>{
    console.log(data)
    io.to(`order_${data.id}`).emit('orderUpdated',data)
})
eventEmitter.on('orderPlaced', (data)=>{

    io.to('adminRoom').emit('orderPlaced', data)
})
// eventEmitter.on('message', (msg)=>{
 
//     io.to(`chat_${msg.id}`).emit('message', msg)
   
//     console.log(msg.id)
//     console.log(msg.id)
//     console.log(msg.id)
//   // socket.broadcast.emit('message', msg)


// }) 
io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
    console.log(msg.id);
        socket.broadcast.emit('message', msg)
    })

})