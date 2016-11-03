var HTTPS = require('https');

var botID = process.env.BOT_ID;

var attack = 20;
var defense = 30;
var evasiveness = 55;
var accuracy = 51;
var hp = 99;
var speed = 61;
var checkpoint = 1;
var races = ["Human", "Android", "Glorgok", "Ikatrians", "Zolts"];
var chosenClasses = ["Warrior", "Rogue", "Ranger", "Berzerker", "Xenomancer"];
//var race = "Android";
//var charClass = "Rogue";

function respond() {
var request = JSON.parse(this.req.chunks[0]),
botRegexKya = /(.|)*pls/;
botsave = /(.|)*\bsave\b/;
botsavecode = /(.|)*\breenter\b/;

var waifuPhrases = [ "https://pbs.twimg.com/media/B8YdqjxIQAAU87L.jpg", "It's not like I l-like you or anything...", 
"B-B-baka!", "My senpai is the best!", "But isn't that... lewd?", "Kemy-kun is sugoi, but not as sugoi as senpai!", "Noooo!",
"http://i0.kym-cdn.com/photos/images/facebook/000/240/558/d76.jpg", "http://2.bp.blogspot.com/-6hX2FngcmZk/U1VlHs5CfNI/AAAAAAAAQNI/yxSWLiV-z94/s1600/waifu.png"]

if(request.text && botRegexKya.test(request.text)) {
this.res.writeHead(200);
postMessage(waifuPhrases[getRandomInt(0,waifuPhrases.length)]);
this.res.end();
}
else if(request.text && botsave.test(request.text)) {
saveProgress();
this.res.end();
}
else if(request.text && botsavecode.test(request.text)) {
var inputString = request.text;
var canDecode = inputString.replace(/^(reenter)/,"");
decode(canDecode);
this.res.end();
}
else {
console.log("Nothing happened");
this.res.writeHead(200);
this.res.end();
}
}



function saveProgress() {
var savecode = 0;
var race = "Human";
switch(race){
case "Human":
savecode = savecode + 1000000000000000; 
break;
case "Android":
savecode = savecode + 2000000000000000;
break;
case "Glorgok":
savecode = savecode + 3000000000000000;
break;
case "Ikatrians":
savecode = savecode + 4000000000000000;
break;
case "Zolts":
savecode = savecode + 5000000000000000;
break;
}
var charClass = "Warrior";
switch(charClass){
case "Warrior":
savecode = savecode + 100000000000000;
break;
case "Rogue":
savecode = savecode + 200000000000000;
break;
case "Ranger":
savecode = savecode + 300000000000000;
break;
case "Berzerker":
savecode = savecode + 400000000000000;
break;
case "Xenomancer":
savecode = savecode + 500000000000000;
break;
}
savecode = savecode + attack * 1000000000000;
savecode = savecode + defense * 10000000000;
savecode = savecode + evasiveness * 100000000;
savecode = savecode + accuracy * 1000000;
savecode = savecode + hp * 10000;
savecode = savecode + speed *100;
savecode = savecode + checkpoint;
encode(savecode);
}

function encode(saveCode){
var digitArray = [];
for(i = 0; i < 16; i++){
digitArray[i] = saveCode % 10;
saveCode = saveCode - digitArray[i];
saveCode = saveCode / 10;
}
var charArray = [];
for(i = 0; i < 16; i++){
charArray[i] = String.fromCharCode(97 + digitArray[i]);
}
var charSaveCode = '';
for (i = 0; i < 16; i++){
charSaveCode = charSaveCode + charArray[i];
}
postMessage("Your saved game code is: " + charSaveCode.toString());

}

function decode(saveCode){
var digitArray = [];
for(i = 0; i < 16; i++){
digitArray[15-i] = saveCode[i].charCodeAt() - 97;
}
characterRace = races[digitArray[0]-1];
characterClass = chosenClasses[digitArray[1]-1];
attack = digitArray[3] + digitArray[2] * 10;
defense = digitArray[5] + digitArray[4] * 10;
evasiveness = digitArray[7] + digitArray[6] * 10;
accuracy = digitArray[9] + digitArray[8] * 10;
hp = digitArray[11] + digitArray[10] * 10;
speed = digitArray[13] + digitArray[12] * 10;
checkpoint = digitArray[15] + digitArray[14] *10;
postMessage("Your attack is: "  + evasiveness);
postMessage(digitArray);
}

function postMessage(response) {
var botResponse,options, body, botReq;

botResponse = response

options = {
hostname: 'api.groupme.com',
path: '/v3/bots/post',
method: 'POST'
};

body = {
"bot_id" : botID,
"text" : botResponse
};

console.log('sending ' + botResponse + ' to ' + botID);

botReq = HTTPS.request(options, function(res) {
if(res.statusCode == 202) {
//neat
} else {
console.log('rejecting bad status code ' + res.statusCode);
}
});

botReq.on('error', function(err) {
console.log('error posting message '  + JSON.stringify(err));
});
botReq.on('timeout', function(err) {
console.log('timeout posting message '  + JSON.stringify(err));
});
botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min)) + min;
}

exports.respond = respond;
