var inquirer = require('inquirer');

//myTweets();
//spotifyThis();
//movieThis();
//randomTxt();

inquirer.prompt([
		{
			type: 'list',
			message: 'What would you like to do?',
			choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
			name: 'doThis'
		}
	]).then(function(answers){
		chooseTask(answers.doThis);
	});

function myTweets(){
	//Get the twitter keys
	var twitterStuffINeed = require("./keys.js");

	var twitterKeys = twitterStuffINeed.twitterKeys;

	var twitter = require('twitter');

	var client = new twitter({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
	});

	//console.log(client);

	var params = {screen_name: 'aaronjaymus'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  } else if(error){
	  	console.log(error);
	  }
	});
}

function chooseTask (task) {
	switch(task){
		case 'my-tweets':
			myTweets();
			break;
		case 'spotify-this-song':
			spotifyThis();
			break;
		case 'movie-this':
			movieThis();	
			break;
		case 'do-what-it-says':
			randomTxt();
			break;
		default: 
			console.log('Milk was a bad choice');
			break;		
		}
}

function spotifyThis() {
	var spotify = require('spotify');

	inquirer.prompt([
			{
				type: 'text',
				message: 'What song are you looking for?',
				name: 'songName',
				default: 'I want it that way'
			}
		]).then(function(answers){

			spotify.search({ type: 'track', query: answers.songName}, function(error, data){
				if(!error){
					console.log(JSON.stringify(data, null, 2));
				} else if (error) {
					console.log(error);
				}
			});
		});
} 

function movieThis() {
	console.log("Movie this");
	var omdb = require('omdb');

	omdb.search('saw', function(error, data){
		if(error){
			return console.log(error);
		}

		if(movies.length<1){
			return console.log("No movies were found!");
		}

		movies.forEach(function(movie){
			console.log(movie.title, movie.year, movie.imdb.rating);
			console.log(movie.plot);
		});
	});
}

function randomTxt () {
	var fs = require('fs');

	fs.readFile("random.txt", "utf8", function(error, data){
		console.log(data);
	});
}