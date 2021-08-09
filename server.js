const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

// useful for sharing code, keep secrets out of harms way
dotenv.config( {path : "config.env "} )
const PORT = process.env.PORT || 8080

// Log Requests
app.use(morgan('tiny'));

// Parse requests to body-parser
app.use(bodyparser.urlencoded( {extended:true} ))

// Set View Engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs")

// Load Assets - using use method (specified the path) to specify the style.css use css/style.css
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))


app.get('/',(req , res)=>{
   res.render('index'); // method allows us to render a html file extension is already specified above!
})

app.get('/add-user',(req , res)=>{
   res.render('add_user'); 
})

app.get('/update-user',(req , res)=>{
   res.render('update_user');
})


app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});