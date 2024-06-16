import mongoose from 'mongoose';

//schema
const requestSchema = new mongoose.Schema({
    _id:String,
    firstName: String,
    lastName: String,
    phone: String,
    age: Number,
    specializations: Array
});

const Requests = mongoose.model('Requests', requestSchema);

export default Requests;