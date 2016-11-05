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
    me = '100000921889753';
	var data = {};
	var threadInfo;
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
	        if(message.body === '/stopthemadness') {
	        	api.sendMessage("fuk the frik off", group);
	        	return stopListening();
	        }
	        if(message.body === '/status') {
	        	api.sendMessage("still working", group);
	   	        api.sendMessage(str(info.nicknames), group);
	        	api.sendMessage(str(data), group);
	        	data.me = data.me - 3;
	        }
	        if(message.body === '/kukup') {
	        	api.sendMessage("HO HO HO", group);
	        	data.me--;
	        	api.changeNickname("Bhuge Dumbass", group, '1683495739');
	        }
	        if(message.body === '/gloriousdawn') {
	        	api.sendMessage("HO HO HO", group);
	        	data.me--;
	        	api.changeGroupImage(fs.createReadStream("./sombrerokul.jpg"), group, function callback(err) {
			        if(err) return console.error(err);
			    });
	        }
	        var user = message.userID;
	        data.user++;
        } 
    });
});
