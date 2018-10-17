const express = require('express');
const dashboard = require('./routes/dashboard');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
app.enable('trust proxy');
app.use(function(req, res, next) {
	if (req.secure) {
		// request was via https, so do no special handling
		next();
	} else {
		// request was via http, so redirect to https
		res.redirect('https://' + req.headers.host + req.url);
	}
});
app.set('json spaces', 2);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'yeet', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname,'frontend','build')));
app.use('/images', express.static(path.join(__dirname, '/uploads')));
app.use(
	'/demo',
	express.static(path.join(__dirname, '/demo'), {
		extensions: [ 'html', 'htm' ]
	})
);
app.use('/', dashboard);
app.use('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

module.exports = app;
