const express=require('express');
const { MongoClient } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
const cors=require('cors')
require('dotenv').config()


const app=express();
const port=process.env.Port||5000;

// middlewire

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8g1rh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run (){
try{
await client.connect();
console.log('Connect to Db');
const database=client.db('carMechanic');
const servicesCollection=database.collection('services');
// GET SINGELE SERVICES

app.get('/services/:id',async (req,res)=>{
    const id=req.params.id;
    console.log('data hitted',id);
    const qurey ={ _id : ObjectId(id)};
    const service=await servicesCollection.findOne(qurey);
    res.send(service);
});


// GET API

app.get('/services' , async (req,res)=>{
const cursore=servicesCollection.find({})
const services= await cursore.toArray();
res.send(services);


})


// POST API
app.post('/services',async (req,res)=>{
    const service=req.body;
    console.log('hit the data Api',service);
    
    
const result = await servicesCollection.insertOne(service);
console.log(result);
res.json(result);

});

// Delete api
app.delete('/services/:id',async(req,res)=>{
const id=req.params.id;
const query= {_id:ObjectId(id)};
const result=await servicesCollection.deleteOne(query);
res.json(result);


})


}

finally{
// await client.close();

}


}
run().catch(console.dir);



app.get('/',(req,res)=>{
res.send('Ranning Genious Servar');
});
app.listen(port,()=>{
    console.log('Ranning Genious Server Port', port);
});
// user:genious-car-sarv
// pass:l0dk6RuGpZpzJfVp