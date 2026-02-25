const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Init database (Will fail if MONGO_URI is missing, but that's expected until configured)
if (process.env.MONGO_URI && process.env.MONGO_URI !== 'your_mongodb_atlas_connection_string_here') {
    connectDB();
} else {
    console.log("Please provide a valid MONGO_URI in .env file to connect to the database");
}

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Define basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
