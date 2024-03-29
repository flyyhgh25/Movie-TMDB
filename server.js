const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const port =  4000
app.use(cors())
app.use(cookieParser())
const router = require('./Routes/auth')
const connectDB = require('./koneksi')
const session = require('express-session')
app.use(session({
    secret:'forgive',
    resave: true,
    saveUninitialized: true
}))
app.listen(port,()=>console.log(`Server berjalan pada port ${port}`))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/auth',router)
connectDB()