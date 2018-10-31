const app = require('./app');
const compression = require('compression')

app.get('/.well-known/acme-challenge/:content', function(req, res) {
  res.send('PMi611XBM1208bVUMrtXD5WQri9Ybb9ZuR8wz7C3MTU.fCnANhc3gdW_Kz6FppVJL4_fhVuqT9VsbkBwCpPttpk');
})
app.use(compression());
app.listen(process.env.PORT,function()
{
	console.log("Website running");
});
