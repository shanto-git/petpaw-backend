const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = 3000;


const app = express();
app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://missionscic:Tu7UlBdHGJyHUtDX@cluster0.o6mocqo.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const database = client.db('petListing');
    const petListing = database.collection('listing');

    app.post('/listing', async(req,res)=>{
        const data = req.body;
        const date = new Date();
        data.createdAt = date;
        console.log(data);
        const result = await petListing.insertOne(data);
        res.send(result)
        
    })

    app.get('/listing', async(req, res)=>{
        const result = await petListing.find().toArray();
        res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req, res)=>{
    res.send('hallo developer')
})

app.listen(port, ()=>{

    console.log(`server is running on ${port}`);
})
