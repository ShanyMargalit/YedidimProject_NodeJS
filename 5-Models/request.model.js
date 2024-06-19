import mongoose from 'mongoose';

// schema
const requestSchema = new mongoose.Schema({
    _id: Number,
    description: String,
    phone: String,
    numOfPeople: Number,
    statusCode: String,
    priorityCode: Number,
    locationCode: String,
    codeVolunteer: String,
});

const Request = mongoose.model('Request', requestSchema);

export default Request;
