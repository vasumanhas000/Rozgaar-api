const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const jobRouter = require("./routers/job");

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter);
app.use(jobRouter);

app.listen(port, () => {
  console.log("App listening on port " + port);
});
