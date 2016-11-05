var login = require("facebook-chat-api");
const fs = require("fs");
const util = require("util");

login({email: "clayytonbhig@gmail.com", password: "naisubhig"}, function callback (err, api) {
    if(err) return console.error(err);

    api.setOptions({
      selfListen: true,
      logLevel: "silent"
    });

    var group = '1144974435591141';
    var me = '100000921889753';
    api.sendMessage("tracking bot is tracking", group);

	var tracking_data = {};
	var deeb = '100003952090241';
    api.getThreadInfo(group, function(err, info) {
    	if (err) return console.error(err);

    	console.log("Here is info, \n", info);
    	console.log("here is the participantIDs variable \n", info.participantIDs);

    	for (var x in info.participantIDs) {
    		var y = info.participantIDs[x];
    		tracking_data[y] = 0;
    	}
	    console.log("tracking_data: ");
	    var str = JSON.stringify(tracking_data, null, 4); // (Optional) beautiful indented output.
		console.log(str);

	    var stopListening = api.listen(function(err, message) {
	    	console.log(message);
	        if (err) return console.error(err);
	        if (message.threadID == group) {
		        if(message.body === '/stopthemadness') {
		        	api.sendMessage("fuk the frik off", group);
		        	return stopListening();
		        }
		        if(message.body === '/status') {
		        	var output = "";
		        	for (var x in tracking_data) {
		        		if (x in info.nicknames) {
		        			var temp = info.nicknames[x];
		        			output = output + temp + ":";
		        			for (var x = 0; x < 30 - temp.length; x++) {
		        				output += " ";
		        			}
		        		} else {
		        			output = output + x + ":";
		        			for (var x = 0; x < 30 - x.length; x++) {
		        				output += " ";
		        			}
		        		}
		        		output = output + tracking_data[x] + '\n';
		        	}
		        	api.sendMessage(output, group);

		        	// str = JSON.stringify(info.nicknames, null, 4); 
		   	     //    api.sendMessage(str, group);
		        	// str = JSON.stringify(tracking_data, null, 4);
		        	// api.sendMessage(str, group);
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
		        if (message.senderID) {
			        tracking_data[message.senderID]++;
			        str = JSON.stringify(tracking_data, null, 4); // (Optional) beautiful indented output.
					console.log(str);		        	
		        }
	        } 
	    });
    });    
});
