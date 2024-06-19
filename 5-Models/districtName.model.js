import mongoose from 'mongoose';

//schema
const districNametSchema = new mongoose.Schema({
   
    _id:Number,
    name:String,
    roads:Array,
    cities:Array

});


const districName = mongoose.model('districName', districNametSchema );

export default districName;