//1. import dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


//2. initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

//3. Middleware (The gatekeepers)
app.use(cors()); //allow the front end to talk to the back end
app.use(express.json()); //allow us to read JSON data sent in requests
//import the routes
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
//use the routes
//This tells the server: "Any URL starting with /api/projects should be handled by projectRoutes"
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes)


//4. Test route (to check if server is working)
app.get('/', (req, res) => {
    res.json({ message: "API is running successfully!"});
});

// 5. Database Connection (Placeholder for now)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 6. Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

