const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const jobRouter = require("./routers/job");
const workerRouter = require("./routers/worker");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(jobRouter);
app.use(workerRouter);

app.listen(port, () => {
  console.log("App listening on port " + port);
});
