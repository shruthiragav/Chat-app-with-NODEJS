const express=require('express');
const app=express();
const httpServer=require('http').createServer(app);
const { Server }=require('socket.io');
const session=require('express-session');
const io=new Server(httpServer);
const multer=require('multer'); 

let PORT=process.env.PORT||5000;

app.set('view engine', 'ejs');
app.set('views', 'views/');
app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:'bharatyh'
}));
app.use(multer().single('images'));
app.use(express.static('views/css'));

httpServer.listen(PORT, ()=>console.log('listening'));


app.get('/', (req, res)=>{
    res.render('userId');
});

app.get('/sendMsg', (req, res)=>{
    res.render('home'); 
});

io.on('connection', (socket)=>{
    socket.join(`${socket.handshake.auth.username}`);
    socket.on('msg', (data)=>{
        socket.to(`${socket.handshake.auth.rn}`).emit('msg', data);
    });  
})
