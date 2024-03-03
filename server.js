const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const schema= require("./models/names_schema");

app.use('/', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = 'mongodb://127.0.0.1:27017/mongodb_curd';

app.get("/budget", async (req, res) => {
    try {
        await mongoose.connect(url);
        console.log('Connected to the database');
        const data = await schema.find({}).collation({ locale: 'en_US', strength: 1 });
       // console.log("Fetched data:", data); 
        res.send(data);

    } catch (error) {
        console.error("Error handling the request:", error);
        res.status(500).send("Internal Server Error");
    }
    finally {
         await mongoose.connection.close();
       }
});

app.post("/addNewBudget", async (req, res) => {
    try {
        await mongoose.connect(url);
        console.log('Connected to the database 2');
        let newData = new schema(req.body);
        await schema.insertMany(newData);
        res.send("Data Entered Successfully");

    } catch (error) {
        console.error("Error handling the request:", error);
        res.status(500).send("Internal Server Error");
    }
    finally {
        await mongoose.connection.close();
      }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});