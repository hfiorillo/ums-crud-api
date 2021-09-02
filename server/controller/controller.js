var Userdb = require('../model/model');

exports.create = (req,res)=>{
    // validate request 
    /* 
    req body in post request i.e. /api/users
    e.g.
    Name: Harry Hughes
    Email: example@example.com
    Gender: Male
    Status: Active
    */
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}

// Retrieve and return all users & retrieve and return single user
exports.find = (req,res) => {
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({
            message : err.message || "Error occured while retreiving user information"
        });
    });
}

// Update a new identified user by user id
exports.update = (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({message : "Data to update can bot be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify : false})
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot update user with ${id}. User not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message:"Error update user information"})
        })
}

// Delete a user by user id
exports.delete = (req,res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data => {
         if(!data){
             res.status(404).send({message : `Cannot delete with ${id}. Maybe id is wrong`})
         }else{
             res.send({
                 message : "User was deleted successfully!"
             })
        }
    })
    .catch(err => {
        res.status(500).send({
            message : "Could not delete user with id = " + id
        })
    });
}
