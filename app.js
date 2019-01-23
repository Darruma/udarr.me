const express = require('express');
const projects = require('./routes/projects');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
require('dotenv').config()
app.enable('trust proxy');
app.use(function (req, res, next) {
	if (process.env.PRODUCTION) {
		if (req.secure) {
			// request was via https, so do no special handling
			next();
		} else {
			// request was via http, so redirect to https
			res.redirect('https://' + req.headers.host + req.url);
		}
	}
});
app.set('json spaces', 2);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: process.env., resave: false, saveUninitialized: true }));

app.get('/arch.sh',(req,res) =>
{
	res.sendFile(path.join(__dirname,'arch.sh'))
})
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use('/images', express.static(path.join(__dirname, '/uploads')));
app.use(
	'/demo',
	express.static(path.join(__dirname, '/demo'), {
		extensions: ['html', 'htm']
	})
);
app.use('/api', projects);
app.use('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
