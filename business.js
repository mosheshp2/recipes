const dataStore = require('./dataStore'),
	  request = require('request');

const APIKEY = '510b4b833870c160aeb1b8dbb6c10178'
const food2forkUrl = 'http://food2fork.com/api/';
const MINIMUM_AMOUNT = 3;

module.exports = {	
	placeOrder: (pasta, sauce, callback) => {
		let myPasta = dataStore.getPastaDetails(pasta);

		if(!myPasta){
			return callback('pasta wasn\'t found');
		}

		if(!myPasta.sauces || myPasta.sauces.indexOf(sauce) == -1){
			return callback('Sauce wasn\'t found');
		}

		let mySauce = dataStore.getSauce(sauce);
        // can add if sauce not found

		let result = {
			price: myPasta.price + sauce.price,
			howToCook: myPasta.cookIt
		};

		console.log('searching ', pasta, sauce);

		callFood2fork('search', `sort=r&q=${pasta} ${sauce}`, function(jsonBody){
			let reciep = jsonBody && jsonBody.recipes && jsonBody.recipes[0];
			if(!reciep) {
				return callback('Error: recipe not found');
			}
			result.image = reciep.image_url;
			console.log('getting ', reciep.recipe_id);

			callFood2fork('get', `rId=${reciep.recipe_id}`, function(bodyRecipe){
			
				result.ingredients = bodyRecipe && bodyRecipe.recipe && bodyRecipe.recipe.ingredients;
			
				// success order
				let amounts = dataStore.placeOrder(pasta, sauce);
				if(amounts.pastaAmount < MINIMUM_AMOUNT){
					notifyLowAmount('pasta', pasta, amounts.pastaAmount );
				}
				if(amounts.sauceAmount < MINIMUM_AMOUNT){
					notifyLowAmount('sauce', sauce, amounts.sauceAmount);
				}

				callback(null, result);
			});
		});
				
	}

};
function callFood2fork(route, param, callback) {
	request({
			url: `${food2forkUrl}${route}?key=${APIKEY}&${param}`,
			json: true
		}, function(err, res, jsonBody){
			if(err){
				console.log(err);
				return callback(err);
			}
			callback(jsonBody);
		});
}

function notifyLowAmount(type, key, amount, callback){
	request({
		url: 'http://localhost:9300',
		params: {
			type: type,
			key: key,
			amount: amount
		}
	}, 
	function(err, res, body){
		console.log('reported low amount', type,key,amount);
		if(callback){  
			callback(body);
		};
	});
}