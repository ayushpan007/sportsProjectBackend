const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const connectDB = require('./config/db');
const {authorize} = require('./middleware/authMiddleware');
const { seedMatchData } = require('./utils/seedMatchData');

const app = express();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    await seedMatchData();
  } catch (error) {
    console.error('Error connecting to the database or seeding data:', error);
    process.exit(1);
  }
})();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || '*' }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authorize);

app.use('/', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
