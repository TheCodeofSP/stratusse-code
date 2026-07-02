require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5050;

connectDB();

app.listen(PORT, () => {
  console.log(`Stratusse API running on port ${PORT}`);
});