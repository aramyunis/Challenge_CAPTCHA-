const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { json } = require('express');
const app = express();


app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get('/', (req,res) =>{
  res.json(JSON.parse(fs.readFileSync('resistered.json')));
})

// post  وەرگرتنەوەی داتا لەڕێگەی میسۆدی 
 app.post('/', (req,res)=>{
   //وەرگرتنی داتا کۆنەکانی فایلی جەیسۆنەکە و تۆمار کردنی داتا تەزەگە
   const olddata = JSON.parse(fs.readFileSync('resistered.json'));
   olddata.push({"name":req.body.name,"pass":req.body.pass ,"status":req.body.status})
   fs.writeFileSync('resistered.json',JSON.stringify(olddata));
   res.json({olddata});
 })
const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=> console.log(`Server Started At Porst : ${PORT}`))