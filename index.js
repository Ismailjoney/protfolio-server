const express = require(`express`)
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express()
//middleware
app.use(cors())
app.use(express.json());
  

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i8hxp3j.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const projectCollection = client.db("protfolio").collection("projects");
         
      

        // get data
        app.get('/projects', async (req, res) => {
            const query = {}
            const cursor = projectCollection.find(query)
            const project = await cursor.toArray();
            res.send(project);
        })
        //get specific data
        app.get('/projects/:id', async(req,res) => {
            const id = req.params.id;
            const query ={_id : ObjectId(id)}
            const singleproject = await projectCollection.findOne(query);
            res.send(singleproject);
        })
       
    }
    finally {

    }
}
run().catch(err => console.log(err))

 

//texting perpuse
app.get('/', (req, res) => {
    res.send(`Single service running`)
})

app.listen(port, () => {
    console.log(`the port is running ${port}`);
})