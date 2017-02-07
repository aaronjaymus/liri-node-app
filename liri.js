var inquirer = require('inquirer');

var fs = require('fs');

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

function chooseTask (task, search) {
	switch(task){
		case 'my-tweets':
			myTweets();
			break;
		case 'spotify-this-song':
			spotifyThis(search);
			break;
		case 'movie-this':
			movieThis(search);	
			break;
		case 'do-what-it-says':
			randomTxt();
			break;
		default: 
			console.log('Milk was a bad choice');
			break;		
		}
}

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
	    for(var i=0; i < 20; i++){
	    	console.log(tweets[i].user.screen_name);
	    	console.log(tweets[i].created_at);
	    	console.log(tweets[i].text);	    	
	    	console.log('====================================================');

	    }
	  } else if(error){
	  	console.log(error);
	  }
	});
}

function spotifyThis(search) {
	var spotify = require('spotify');

	var song = search;

	if(song === undefined) {
		inquirer.prompt([
				{
					type: 'text',
					message: 'What song are you looking for?',
					name: 'songName',
					default: 'The sign'
				}
			]).then(function(answers){

				spotify.search({ type: 'track', query: answers.songName}, function(error, data){
					var tracks = data.tracks.items;
					if(!error){
						for(var i=0; i<tracks.length; i++){
							console.log("Artist: "+tracks[i].artists[0].name);
							console.log("Song name: "+tracks[i].name);
							console.log("Album: "+tracks[i].album.name);
							console.log("URL: "+tracks[i].href);
							console.log("===============================================");
						}
					} else if (error) {
						console.log(error);
					}
				});
			});
	} else {
		spotify.search({ type: 'track', query: song}, function(error, data){
			var tracks = data.tracks.items;
			if(!error){
				for(var i=0; i<tracks.length; i++){
					console.log("Artist: "+tracks[i].artists[0].name);
					console.log("Song name: "+tracks[i].name);
					console.log("Album: "+tracks[i].album.name);
					console.log("URL: "+tracks[i].href);
					console.log("===============================================");
				}				
			} else if (error) {
				console.log(error);
			}
		});		
	}
} 

function movieThis(search) {

	var omdb = require('omdb');

	var thisMovie = search;

	if(thisMovie === undefined){
		inquirer.prompt([
				{
					type: 'text',
					message: 'What movie are you looking for?',
					name: 'movieName',
					default: 'Mr. Nobody'
				}
			]).then(function(answers){
				omdb.search(answers.movieName, function(error, data){
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
		});
	} else {
		omdb.search(thisMovie, function(error, data){
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
}

function randomTxt () {

	fs.readFile("random.txt", "utf8", function(error, data){
		var task = data.substring(0, data.indexOf(','));
		var search = data.split(',').pop();
		chooseTask(task, search);
	});
}