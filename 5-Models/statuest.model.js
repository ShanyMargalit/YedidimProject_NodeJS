import mongoose from 'mongoose';

//schema
const statuestSchema = new mongoose.Schema({
    // _id:String,
    statusName:String
});

const Statues = mongoose.model('statuses', statuestSchema);

export default Statues;