import mongoose from 'mongoose';

//schema
const prioritiesSchema = new mongoose.Schema({
    // _id:Number,
    priority:String
 
});

const priorities = mongoose.model('priorities', prioritiesSchema );

export default priorities;