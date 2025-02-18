import mongoose from 'mongoose';

//schema
const districtSchema = new mongoose.Schema({
    _id:Number,
    name:String,
    roads:Array,
    cities:Array
});

const District = mongoose.model('district', districtSchema);

export default District;