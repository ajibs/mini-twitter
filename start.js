const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`Error!: ${err.message}`);
});


// import all of our models
require('./models/Comment');
require('./models/Tweet');
require('./models/User');

const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`Magic is happening on ${process.env.PORT}`);
});
