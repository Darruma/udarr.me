const app = require('./app');
const compression = require('compression')
app.use(compression());
require('dotenv').config()
app.listen(process.env.PORT,function()
{
	console.log("Website running " + process.env.PORT);
});