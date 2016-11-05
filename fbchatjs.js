var login = require("facebook-chat-api");
const fs = require("fs");

login({email: "clayytonbhig@gmail.com", password: "naisubhig"}, function callback (err, api) {
    if(err) return console.error(err);

    api.setOptions({
      selfListen: true,
      logLevel: "silent"
    });

    var group = '1144974435591141';
    api.sendMessage("Enter B H I G", group);
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
	        	api.changeGroupImage(fs.createReadStream("./sombrerokul.jpg"), group, function callback(err) {
			        if(err) return console.error(err);
			    });
	        }
	        if(message.body === '/surendrekt') {
	        	api.sendMessage("Surendrekt", group);
	        	api.removeUserFromGroup(me, group, function callback(err){
			        if(err) return console.error(err);
			    });
	        }
	        var user = message.userID;
	        data.user++;
        } 
    });
});
