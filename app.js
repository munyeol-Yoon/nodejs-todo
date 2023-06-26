const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const PORT = process.env.PORT;
const app = express();

const router = express.Router();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
