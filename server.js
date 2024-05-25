  require('dotenv').config()
  const express = require('express')
  const mongoose = require('mongoose')
  const cors = require('cors')
  const { Server } = require('socket.io');
  const cookieParser = require('cookie-parser')
  const SocketServer = require('./socketServer')
  const {ExpressPeerServer} = require('peer')
  const { createServer } = require('http');

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
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Add all necessary methods
  credentials: true  // Enable CORS with credentials
}));
app.use(cookieParser());


// Handle preflight requests
app.options('*', cors({
  origin: ["https://www.world-network.site"],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true
}));



  // Initialize Socket.IO with CORS
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: ["https://www.world-network.site"],
      methods: ["GET", "POST"],
      credentials: true
    }
  });
 
  io.on('connection', (socket) => {
    console.log('New client connected');
    SocketServer(socket);
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  

// Create PeerServer for WebRTC
 ExpressPeerServer(httpServer, {path: '/'})


 //Routres

 app.use('/api',require('./router/authRoute'))
 app.use('/api',require('./router/userRoute'))
 app.use('/api',require('./router/postRouter'))
 app.use('/api',require('./router/commentRouter'))
 app.use('/api',require('./router/messageRouter'))


  const port = process.env.PORT || 4000

  httpServer.listen(port,()=>{
     console.log(`Server is runing on port ,port${port}`);
  })   