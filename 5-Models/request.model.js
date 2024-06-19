import mongoose from 'mongoose';

//schema
const requestSchema = new mongoose.Schema({
    _id:Number,
    Description:String,
    phone: String,
    numOfPeopel: Number,
    codeStatus: String,
    codePriority:Number,
    codeLocation: String,
    codeVolunteer: String,
});
// קוד בקשה רץ
// תיאור הבעיה- STRING
// טלפון- STRING
// מספר התקועים-INT
// קוד סטטוס (001-ממתין, 002-בטיפול, 003- הסתיים)
// קוד עדיפות (1-4)
// קוד מיקום (אני עכשיו עובדת על זה, זה יהיה סתם מחרוזת של 5 ספרות)
// קוד מתנדב

const Requests = mongoose.model('Requests', requestSchema);

export default Requests;