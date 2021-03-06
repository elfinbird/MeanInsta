    const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const testFolder = '../MeanInstaClient/src/assets/img/';
const fs = require('fs');

const User = mongoose.model('User');
const UserSecurity = mongoose.model('UserSecurity');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.userId = req.body.userId;
    console.log("register ");
    console.log(user);
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
    var userSecurity = new UserSecurity();
    userSecurity.userId = req.body.userId;
    userSecurity.password = req.body.password;
    userSecurity.save((err, doc) => {
        if (err){
            return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{//if user record not found check in usersecurity table and then eturn users
   UserSecurity.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'Secured User record not found.' });
            else{
                newfiles = [];
                fs.readdir(testFolder, (err, files) => {
                  if(files){
                        newfiles = files;
                  }
                });
                User.findOne( _.pick(user,['userId']),
                    (err, user) => {
                        if (!user)
                            return res.status(404).json({ status: false, message: 'User Info not found.' });
                        else{
                            return res.status(200).json({ status: true, file : newfiles, user : _.pick(user,['fullName','email', 'userId']) });
                        }
                    }
                );
            }
        }
    );
}

/*module.exports.allImages = (req, res, next) =>{//if user record not found check in usersecurity table and then eturn users
    fs.readdir(testFolder, (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
    });
}*/