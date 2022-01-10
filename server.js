const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

// Init Express
const app = express();

// Init middleware
app.use(express.json({ extended: false }), cors());

const corsOptions = {
	origin: 'http://example.com',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// GET request if API is running
app.get('/', cors(corsOptions), (req, res) =>
	res.send('API is running successfully')
);

// Get location of ISS
app.get('/location/:timestamp', async (req, res) => {
	const timestamp = req.params.timestamp;
	const url = `https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${timestamp}&units=miles`;
	const response = await fetch(url);
	const data = await response.json();
	res.send(data);
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Store PORT in a variable
const PORT = process.env.PORT || 5000; //process.env for deployment env
// Port to listen
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
