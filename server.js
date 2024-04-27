  require('dotenv').config()
  const express = require('express')
  const mongoose = require('mongoose')
  const cors = require('cors')
  const cookieParser = require('cookie-parser')
  const SocketServer = require('./socketServer')
  const {PeerServer} = require('peer')


// mongoDb Conncted functions
mongoose.connect("mongodb://127.0.0.1:27017/SocialPulse", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())

 //socket.io 
 const http = require('http').createServer(app)
 const io = require('socket.io')(http)

 
 io.on('connection', socket => {
  SocketServer(socket) 
 })


 // Create peerServer  (WebRTc)
 PeerServer({port: 3001, path:'/'})


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