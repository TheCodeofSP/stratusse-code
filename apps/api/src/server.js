require("dotenv").config();

const env = require("./config/env");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Stratusse API running on port ${PORT}`);
});
