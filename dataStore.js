

let myExports = {
	getPastas: () => {
		return pastas;
	},
	getSauces: () => {
		return sauces;
	},
	getPastaDetails: (pastaType) => {
		let myPastas = myExports.getPastas().filter((item) => item.name === pastaType );

		return myPastas && myPastas.length > 0 && myPastas[0];
	},

	getSauce: (sauce) => {
		let sauces = myExports.getSauces().filter((item) => { item.name === sauce });

		return sauces && sauces.length > 0 && sauces[0];
	},

	placeOrder: (pasta, sauce) => {
		let myPasta = myExports.getPastaDetails(pasta);
		myPasta.amount -= 1;
		
		let mySauce = myExports.getSauce(sauce);
		mySauce.amount -= 1;

		return {
			pastaAmount: myPasta.amount,
			sauceAmount: mySauce.amount
		};		

	}
		
};

module.exports = myExports;



const pastas = [{
			name: 'Spaghetti',
			price: 10,
			cookIt: 'text to fill from api',
			sauces:['Tomato', 'Alfredo', 'Bolognese'],
			amount: 3
		}, 
		{
			name: 'Farfalle',
			price: 10,
			cookIt: 'text to fill from api',
			sauces:['Tomato', 'Alfredo', 'Bolognese']		,
			amount: 5	
		}, 
		{
			name: 'Lasagne',
			price: 10,
			cookIt: 'text to fill from api',
			sauces:['Tomato', 'Alfredo', 'Bolognese'],
			amount: 6
		}, 
		{
			name: 'Dettuccine',
			price: 10,
			cookIt: 'text to fill from api',
			sauces:['Tomato', 'Alfredo', 'Bolognese'],
			amount: 2			
		}];
const sauces = [{
			name: 'Tomato',
			price: 2,
			amount: 3
		}, 
		{
			name: 'Cream cheese',
			price: 2,
			amount: 3
		}, 
		{
			name: 'Pesto',
			price: 2,
			amount: 3
		}, 
		{
			name: 'Alfredo',
			price: 2,
			amount: 3
		},
		{
			name: 'Bolognese',
			price: 2,
			amount: 3
		}];
