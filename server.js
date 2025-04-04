
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const port = 3001;
const routes = require("./routes");

mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect("mongodb+srv://fatima:qazwsxedcrfv@testapp.fisdzpm.mongodb.net/todos?retryWrites=true&w=majority&appName=testapp", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB Atlas successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    return;
  }

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", routes);

  app.use((err, req, res, next) => {
    console.error('Express error handler:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}

