const express = require('express'),
	  app = express(),
	  business = require('./business'),
	  dataStore = require('./dataStore');

// TODO: add global error handler to 400

app.get('/api/pasta', function(req, res){
	res.send(JSON.stringify(dataStore.getPastas()));
});

app.get('/api/sauce', (req, res) => {
	res.send(JSON.stringify(dataStore.getSauces()));
});

app.get('/api/pasta/:pastaType', (req, res) => {
	let pastaType = req.params.pastaType;
	if(!pastaType){
		return res.status(400).send('Error, please supply pasta type');
	}
	
	let pasta = dataStore.getPastaDetails(pastaType);
	if(pasta){
		res.send(JSON.stringify( pasta ));
	}
	else{
		res.status(400).send('pasta wasn\'t found');
	}
});


app.post('/api/order/:pastaType/:sauceType', (req, res) => {
	let pastaType = req.params.pastaType;
	let sauceType = req.params.sauceType;
	if(!pastaType || !sauceType){
		return res.status(400).send('Error, please supply pasta and sauce');
	}
	business.placeOrder(pastaType, sauceType , function callback(err, data){
		if(err){
			return res.status(400).send(err);
		}
		res.send(JSON.stringify(data));

	});
	
});



app.listen(3000,  () => console.log(' (web) app listening on port 3000!'));