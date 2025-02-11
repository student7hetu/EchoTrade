const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//connect mongodb
connectDB();

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));