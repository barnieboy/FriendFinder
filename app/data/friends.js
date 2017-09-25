const fs = require("fs");
function updateList (object) {

	
	if (!fs.existsSync(file)) {
		fs.writeFileSync(file, "[" + JSON.stringify(object) + "]");
	
	} else {

		fs.readFile(file, 'utf-8', (err, data) => {
			if (err) {
				console.log(err);
			}

			var arr = [];
			
			if (data) {
				arr = JSON.parse(data);
			}
			
			arr.push(object);
			
			fs.writeFile(file, JSON.stringify(arr, null, 5), (err) => {
					if (err) console.log(err);

				});

		});
	}
}

function getCurrentList() {

	return new Promise((resolve, reject)=>{
		
		fs.readFile(file, 'utf-8', (err, data) => {
			
			if (err) {
				reject(err);
			}
			var arr = [];
			
			if (data) {
				arr = JSON.parse(data);
			}
			
			resolve(arr);
		});
	});
}


function matchToFriend (obj) {
	

	return new Promise((resolve, reject) => {

		getCurrentList().then((allFriends)=>{
			

			
			var userScores = obj.scores;

			userScores.map((e)=> parseInt(e));
			

			var closestFriend = {
				name: '',
				photo: '',
				scores: []
			}

			var lowestDiff = 50;

			
			allFriends.forEach((e, i)=>{
				
				var diffBetween = e.scores.map((e)=> parseInt(e))
					
					.reduce((accumulator, value, index)=> {
						return accumulator + Math.abs(value - userScores[index]);
					});

					console.log('______________________________');
					console.log(i+": "+e.name +" "+ "has a difference between the user of "+diffBetween);
					console.log('______________________________');

				
				if (diffBetween < lowestDiff) {
					
					lowestDiff = diffBetween;
	
					closestFriend = allFriends[i];

					console.log("***********"+e.name +" "+"is now the closest match with a diff of "+lowestDiff);
					console.log('______________________________');

				}
			});
			
			updateList(obj);
			
			resolve(closestFriend);
			
		}).catch((err)=>{if(err) reject(err);});

	});

}

exports.updateList = updateList;
exports.matchToFriend = matchToFriend;
exports.getCurrentList = getCurrentList;

