const express = require("express");
require("./db/mongoose");

const usersRouter = require("../src/routers/users");
const app = express();
app.use(express.json());
app.use(usersRouter);

app.listen(3000, () => {
  console.log("server is running...");
});
