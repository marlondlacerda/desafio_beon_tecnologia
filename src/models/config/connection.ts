import mongoose from 'mongoose';

require('dotenv/config');

const options = {
  autoIndex: false,
  dbName: process.env.MONGO_DB,
};

const mongoDatabaseURI = process.env.MONGO_URI;

const connectToDatabase = () => mongoose.connect(mongoDatabaseURI, options);

export default connectToDatabase;
