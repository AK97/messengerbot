var login = require("facebook-chat-api");
const fs = require("fs");

login({email: "clayytonbhig@gmail.com", password: "naisubhig"}, function callback (err, api) {
    if(err) return console.error(err);

    api.setOptions({
      selfListen: true,
      logLevel: "silent"
    });

    var group = '1144974435591141';
    api.sendMessage("tracking bot is tracking", group);
    var me = '100000921889753';
	var data = {};
	var threadInfo;
	var deeb = '100003952090241';
    api.getThreadInfo(group, function(err, info) {
    	console.log(info);
    	threadInfo = info;
    	for (var x in info.participantIDs) {
    		data.x = 0;
    	}
    });

    var stopListening = api.listen(function(err, message) {
        if (err) return console.error(err);
        if (message.threadID == group) {
            const type = message.body;
	        if(message.body === '/stopthemadness') {
	        	api.sendMessage("fuk the frik off", group);
	        	return stopListening();
	        }
	        if(message.body === '/status') {
	        	api.sendMessage("still working", group);
	   	        api.sendMessage(str(threadInfo.nicknames), group);
	        	api.sendMessage(str(data), group);
	        }
	        if(message.body === '/kukup') {
	        	api.sendMessage("HO HO HO", group);
	        	api.changeNickname("Bhuge Dumbass", group, deeb);
	        }
	        if(message.body === '/dab') {
	        	api.sendMessage({attachment: fs.createReadStream('dab.png')}, group);
	        	api.changeNickname("Bhuge Dumbass", group, deeb);
	        }
	        if(message.body === '/gloriousdawn') {
	        	api.sendMessage("HO HO HO", group);
	        	api.changeGroupImage(fs.createReadStream("dab.png"), group, function callback(err) {
			        if(err) return console.error(err);
			    });
	        }
/*
	        if(type.indexOf("/8ball")==0){
                var eightball = ["It is certain","It is decidedly so","Without a doubt", "Yes, definitely","Yes, definitely","You may rely on it",
                    "As I see it, yes"," Most likely","Outlook good","Yes","Signs point to yes","Reply hazy try again","Ask again later","Better not tell you now",
                    "Cannot predict now","Concentrate and ask again","Don't count on it","My reply is no","My sources say no","Outlook not so good",
                    "Very doubtful"];

               api.sendMessage(eightball[Math.floor(Math.random()*20)],group);
            }
*/
            console.log(typeof message.body);
	        var user = message.userID;
	        data.user++;

        }
    });
});
