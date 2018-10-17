const app = require('./app');
const compression = require('compression')
app.use(compression());
app.listen(process.env.PORT,function()
{
	console.log("Website running");
});