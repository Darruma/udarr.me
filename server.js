const app = require('./app');
const compression = require('compression')
const port = process.env.PORT || 3005
console.log(port)
app.use(compression());
app.listen(port,function()
{
	console.log("Website running " + port);
});
