const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Starts the app and creates a port
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//api routes
app.use('/api', apiRoutes)

//HTML ROUTES
app.use('/', htmlRoutes);

//Start the server on the port
app.listen(PORT, () => console.log('listening at http://localhost:${PORT}'));

