const moongoese = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URI;

async function connectDB() {
  try {
    await moongoese.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // connect to results collection
    // const coll = await moongoese.connection.db.collection("results");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connectDB };
