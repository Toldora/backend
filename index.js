const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const casinosRoutes = require("./routes/casinos");

const PORT = process.env.PORT || 3030;

const app = express();

app.use(casinosRoutes);

async function init() {
  try {
    await mongoose.connect(
      "mongodb+srv://kropivnyi:toldora21@cluster0.qppwslg.mongodb.net/casinos",
      {
        useNewUrlParser: true,
      }
    );
    app.listen(PORT, () => {
      console.log("Server has been started...");
    });
  } catch (e) {
    console.log(e);
  }
}

init();
