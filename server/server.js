require('dotenv').config();
const app = require("./app");
const connectDatabase = require("./config/db.js");
const port = process.env.PORT;
connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

