const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors')
const port = process.env.PORT;

const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');

connectDB();
const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/file', fileRoutes);

app.use(errorHandler);

app.listen(port, (console.log(`Server listening to ${port}`.cyan)))