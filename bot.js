var HTTPS = require('https');

var botID = process.env.BOT_ID;



function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegexKya = /(.|)*kya!~/;
      botname = /(.|)*kyaa!~/;
      botsave = /()save/;
  
  var waifuPhrases = [ "https://pbs.twimg.com/media/B8YdqjxIQAAU87L.jpg", "It's not like I l-like you or anything...", 
                      "B-B-baka!", "My senpai is the best!", "But isn't that... lewd?", "Kemy-kun is sugoi, but not as sugoi as senpai!", "Noooo!",
                     "http://i0.kym-cdn.com/photos/images/facebook/000/240/558/d76.jpg", "http://2.bp.blogspot.com/-6hX2FngcmZk/U1VlHs5CfNI/AAAAAAAAQNI/yxSWLiV-z94/s1600/waifu.png"]

  if(request.text && botRegexKya.test(request.text)) {
    this.res.writeHead(200);
    postMessage(waifuPhrases[getRandomInt(0,waifuPhrases.length)]);
    this.res.end();
  }
  else if(request.text && botname.test(request.text)) {
    this.res.writeHead(200);
    postMessage("test");
    this.res.end();
  }
  else if(request.text && botsave.test(request.text)) {
    saveProgress();
    this.res.end();
  }
  else {
    console.log("Nothing happened");
    this.res.writeHead(200);
    this.res.end();
  }
}

function saveProgress() {
  
  postMessage("saved");
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
