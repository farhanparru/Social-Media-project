  require('dotenv').config()
  const express = require('express')
  const mongoose = require('mongoose')
  const cors = require('cors')
  const cookieParser = require('cookie-parser')
  const SocketServer = require('./socketServer')
  const {ExpressPeerServer} = require('peer')


// mongoDb Conncted functions
mongoose.connect("mongodb+srv://shaminmuhammad116:Parru1234@cluster0.imbsnlg.mongodb.net/Network?retryWrites=true&w=majority", {    
    useNewUrlParser: true,
    useUnifiedTopology: true   
}).then(() => {     
    console.log('Connected to MongoDB');   
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message); 
});  


   
const app = express(); 
app.use(express.json());
app.use(cors({
    origin: ["https://www.world-network.site"], // Update with your frontend URL
    methods: ["GET", "POST"],
    credentials: true  // Enable CORS with credentials
})); 
app.use(cookieParser());


  // Initialize Socket.IO with CORS
 const http = require('http').createServer(app)
 const io = require('socket.io')(http,{
   cors:{
    origin: ["https://www.world-network.site"], 
    methods: ["GET", "POST"],
    credentials: true
   }
 })

 
 io.on('connection', socket => {
  SocketServer(socket) 
 })


// Create PeerServer for WebRTC
 ExpressPeerServer(http, {path: '/'})


 //Routres

 app.use('/api',require('./router/authRoute'))
 app.use('/api',require('./router/userRoute'))
 app.use('/api',require('./router/postRouter'))
 app.use('/api',require('./router/commentRouter'))
 app.use('/api',require('./router/messageRouter'))


  const port = process.env.PORT || 4000

  http.listen(port,()=>{
     console.log(`Server is runing on port ,port${port}`);
  })   