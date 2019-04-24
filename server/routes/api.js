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

// delete user
router.delete('/delete/:id', async (req, res) => {
    var id = req.params.id
    const result = await userModel.deleteOne({ _id: id});
    res.send(result);
});

module.exports = router;