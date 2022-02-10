const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routers/userRouter");
const cors = require("cors");
const messageRouter = require("./routers/messageRouter");

const PORT = 4000;
const app = express();

app.use(cors());
app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

app.listen(PORT, () => {
  console.log(`${PORT} API SERVER START`);
});
