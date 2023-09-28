const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const port = 8000;

//DATABASE STUFF
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS USING STUFF
app.use('/static', express.static('static'));

//PUG USING STUFF
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
})

//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
