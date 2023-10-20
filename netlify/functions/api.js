const serverless = require("serverless-http");
const app = require("../../index");

export const handler = serverless(app);
