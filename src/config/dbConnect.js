import mongoose from 'mongoose';

async function dbConnect() { 
    mongoose.connect('mongodb+srv://adminUser:admin1234@cluster0.kxpvtag.mongodb.net/?appName=Cluster0')

    return mongoose.connection;
};

export default dbConnect;