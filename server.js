  require('dotenv').config()
  const express = require('express')
  const mongoose = require('mongoose')
  const cors = require('cors')
  const cookieParser = require('cookie-parser')


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

 //Routres

 app.use('/api',require('./router/authRoute'))
 app.use('/api',require('./router/userRoute'))
 app.use('/api',require('./router/postRouter'))
 app.use('/api',require('./router/commentRouter'))


  const port = process.env.PORT || 4000

  app.listen(port,()=>{
     console.log(`Server is runing on port ,port${port}`);
  })