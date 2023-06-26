const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const db = require("./models");

dotenv.config();

const PORT = process.env.PORT;
const app = express();

const todosRouter = require("./routes/todos.router");

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", todosRouter);
app.use(express.static("./assets"));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
