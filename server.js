const app = require('./app')
const connectDb = require("./Config/db");
const dotenv = require('dotenv')


dotenv.config({ path: './dev.env' })

const mongoUrl = process.env.MONGO_URL
// database
connectDb(mongoUrl);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
