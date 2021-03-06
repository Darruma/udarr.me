const express = require('express');
const filesystem = require('./routes/filesystem')
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
require('dotenv').config()
app.enable('trust proxy');

app.set('json spaces', 2);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.secret, resave: false, saveUninitialized: true }));

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use('/images', express.static(path.join(__dirname, '/uploads')));
app.use(
	'/demo',
	express.static(path.join(__dirname, '/demo'), {
		extensions: ['html', 'htm']
	})
);
app.use('/api', filesystem)
app.use("/library",(req,res) => {
    res.sendFile(path.resolve(__dirname,'Books.html'));
})
app.use('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(process.env.PORT, () => {
	console.log("listening on PORT " + process.env.PORT)
})
