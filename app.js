require('dotenv').config({path: './config/config.env'})
const connectDB = require('./config/db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
connectDB();

app.use(cors({origin:'http://143.110.240.38'}))
app.use(morgan('common'))
app.use(helmet())
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))

const advisoryDataRoutes = require('./routes/advisory-data.route');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user.route');
const advisoryDropdownRoutes = require('./routes/advisory-dropdown.route');

app.use('/api/v1/advisory', advisoryDataRoutes);
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/advisory-dropdown', advisoryDropdownRoutes);

app.listen(process.env.PORT, () => console.log(`Server is listening at port ${process.env.PORT}`))