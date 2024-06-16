// getting-started.js
//const mongoose = require('mongoose');
import mongoose from "mongoose";
async function connect() {
    await mongoose.connect('mongodb+srv://Shani:shani585@atlascluster.sr6dpp3.mongodb.net/');
}

export default connect;