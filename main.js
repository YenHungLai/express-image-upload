const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const fs = require('fs');
const upload = require('./multerConfig');

// Initialize express app
const app = express();

// Template engine config
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set static folder
app.use(express.static(path.join(__dirname, 'uploads')));
// What does the first argument do??
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
	fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
		console.log(files);
		// Send file names to frontend
		res.render('home', {
			imgUrl: files
		});
	});
});

app.post('/upload', upload.single('img'), (req, res) => {
	console.log(req.file);
	console.log(req.url);
	res.redirect('/');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
