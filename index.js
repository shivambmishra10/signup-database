const express=require('express')
const bodyParser=require('body-parser')
const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='signup'
const mongoose=require('mongoose')
const app=express()
const port=process.env.PORT || 3000
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


// mongoose.connect('mongodb://localhost:27017/mydb',{
//     userNewUrlParser:true,
//     useUnifiedTopoLogy:true
// })
// const db=mongoose.connection
// db.on('error',()=>console.log("error in connecting to database"))
// db.once('open',()=>console.log("connected to database"))
app.post('/sign_up',(req,res)=>
{
    const name=req.body.name
    const email=req.body.email;
    const phno=req.body.phno;
    const password=req.body.password
    const data={
        "name":name,
        "email":email,
        "phno":phno,
        "password":password
    }
    MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>
{
    if(error)
    return console.log('Unable to connect')
    const db=client.db(databaseName)
    db.collection('users').insertOne(data,(err,collection)=>
    {
        if(err)
        throw err
        console.log("record stored successfully")
    })
})
   
    return res.redirect('signup_success.html')
})
app.get('/',(req,res)=>
{
   res.redirect('index.html')
})
app.listen(port,()=>
{
    console.log(`server set up at port ${port}`)
})