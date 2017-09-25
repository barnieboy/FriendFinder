const friends = require("../data/friends.js");
module.exports = function(app){

	app.get('/api/friends', function (req, res) {

		friends.getCurrentList()
			.then( (allFriends)=> res.json(allFriends) )
			.catch( (err)=> {if (err) console.log(err)} );
	});

	app.post('/api/friends', function (req, res){

		friends.matchToFriend(req.body).then((friend)=>{
			res.json(friend);
		}).catch((err)=>{if (err) console.log(err);});

	});

	app.get('/api/characters', function (req, res) {

		characters.getCurrentCharList()
			.then( (allCharacters)=> res.json(allCharacters) )
			.catch( (err)=> {if (err) console.log(err)} );
	});

	app.post('/api/characters', function (req, res){

		characters.matchToCharacter(req.body).then((character)=>{
			res.json(character);
		}).catch((err)=>{if (err) console.log(err);});

	});
}