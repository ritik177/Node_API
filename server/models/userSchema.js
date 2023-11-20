const mongoose = require("mongoose");
const validator = require("validator");// this is used for email validator


//create  users Schema

const usersSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true//this remove the extra spacing from left and  right
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("not valid Email")
            }
        }
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    gender:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Active","In-Active"],//the value of status must be  used one of the specified strings: either "Active" or "In-Active"
        default:"Active"
    },
    datecreated:Date,
    dateUpdated:Date

})

//model define

const users = new mongoose.model("users", usersSchema);
module.exports = users;