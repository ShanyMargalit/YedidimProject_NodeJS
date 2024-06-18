import mongoose from "mongoose";
async function connect() {
    await mongoose.connect('mongodb+srv://batsi1606:batsi0548591606@cluster0.pne4kfa.mongodb.net/Yedidim');
}

export default connect;