const express = require("express");
const serverless = require("serverless-http");
const casinosRoutes = require("../../routes/casinos");

const api = express();

api.use("/api/", casinosRoutes);

export const handler = serverless(api);
