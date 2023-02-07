const express = require('express');
require('dotenv').config();
const colors = require('colors');
const port = process.env.PORT;

const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');

connectDB();
const app = express();

app.use('/file', fileRoutes);

app.use(errorHandler);

app.listen(port, (console.log(`Server listening to ${port}`.cyan)))