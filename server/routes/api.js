const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/model');
const app = express();


// const db = 'mongodb+srv://jtuburan:jtuburan@cluster0-msk2y.mongodb.net/test?retryWrites=true';
// mongoose.Promise = global.Promise;
// mongoose.connect(db, function(err){
//     if(err){ 
//         console.error("Error" + err);
//     }
// });

mongoose.connect('mongodb://localhost/crud', {useNewUrlParser: true})
    .then(() => {
        console.log('connected to the database');
    })
    .catch ((err)=> {
        console.log('error connection', err);
    });
    
router.get('/get/:id', async (req,res) => {
    var id = req.params.id;
    try {
        const userList = await User.find({ _id: id})
        res.json(userList);
    } catch (error) { 
        res.status(500);
    }
});

router.post('/post',(req, res)=>{
    let userData = new userModel(req.body);
    userData.save()
    res.send(userData);
});

router.get('/users',async (req, res) => {
    try {
        const userList = await userModel.find()
        res.send(userList);
    } catch (error) {
        res.status(500);
    }
});


//edit
app.put('/update/:id', async (req, res) => {
    //res.send('Got a PUT request at /user')
    var id = req.params.id;
    const updateUser = await userModel.findById(id);
    if(!updateUser) return;
    updateUser.name = req.body.name;
    updateUser.email = req.body.email;
    updateUser.contact = req.body.contact;
    const result = await updateUser.save();
    console.log(result);
    res.json(result);
});

// delete user
router.delete('/delete/:id', async (req, res) => {
    var id = req.params.id
    const result = await userModel.deleteOne({ _id: id});
    res.send(result);
});



module.exports = router;