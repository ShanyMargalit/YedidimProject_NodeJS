import mongoose from 'mongoose';

//schema
const volunteerSchema = new mongoose.Schema({
    _id:String,
    firstName: String,
    lastName: String,
    phone: String,
    age: Number,
    specializations: Array
});

const Volunteer = mongoose.model('Volunteers', volunteerSchema);

export default Volunteer;