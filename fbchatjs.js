var login = require("facebook-chat-api");
const fs = require("fs");
var cleverbot = require('cleverbot.io');



var bot = new cleverbot('TYHRwNcZFicTF4xI','rKarZL4vSevwLDnjLXnGK7MRkBwud1W1');
bot.setNick("clayton");


login({email: "clayytonbhig@gmail.com", password: "naisubhig"}, function callback (err, api) {
    if(err) return console.error(err);

    api.setOptions({
      selfListen: true,
      logLevel: "silent"
    });

    var group = '1144974435591141'; //test chat pls ignore
    api.sendMessage("Enter B H I G", group);
    var me = '100000921889753'; //roon's user ID
	var tracking_data = {};
	var thread_info = {};
	var deeb = '100003952090241'; //aaron's user ID

    api.getThreadInfo(group, function(err, info) {
    	if (err) return console.error(err);
    	thread_info = info;
    	console.log("Here is info, \n", thread_info);
    	console.log("here is the participantIDs variable \n", info.participantIDs);

    	for (var x in thread_info.participantIDs) {
    		var y = thread_info.participantIDs[x];
    		tracking_data[y] = 0;
    	}
	    console.log("tracking_data: ");
	    var str = JSON.stringify(tracking_data, null, 4); // (Optional) beautiful indented output.
		console.log(str);

	    var stopListening = api.listen(function(err, event) {
	        if (err) return console.error(err);
	        console.log(event);
	        if (event.threadID == group) {
	        	switch(event.type) {
	        		case "message":
	            		const input = event.body;
	            		if (input) {
	            			if(input === '/stopthemadness') {
		        				api.sendMessage("fuk the frik off", group);
		        				return stopListening();
		        			}
		        			if(event.body === '/status') {
		        				api.getThreadInfo(group, function(err, info) {
		        					if (err) return console.error(err);
			        				thread_info = info;
						        	var output = tracking_data;
						        	for (var x in thread_info.nicknames) {
						        		if (x in output) {
						        			output[thread_info.nicknames[x]] = output[x];
											delete output[x];
						        		}
						        	}
						        	api.sendMessage(JSON.stringify(output, null, 4), group);

						        	// for (var x in tracking_data) {
						        	// 	if (x in thread_info.nicknames) {
						        	// 		var temp = thread_info.nicknames[x];
						        	// 		output = output + temp + ":";
						        	// 		for (var x = 0; x < 30 - temp.length; x++) {
						        	// 			output += " ";
						        	// 		}
						        	// 	} else {
						        	// 		output = output + x + ":";
						        	// 		for (var x = 0; x < 30 - x.length; x++) {
						        	// 			output += " ";
						        	// 		}
						        	// 	}
						        	// 	output = output + tracking_data[x] + '\n';
						        	// }
						        	// api.sendMessage(output, group);		        					
		        				});


					        	// str = JSON.stringify(info.nicknames, null, 4); 
					   	     //    api.sendMessage(str, group);
					        	// str = JSON.stringify(tracking_data, null, 4);
					        	// api.sendMessage(str, group);
					        }		
		        			if(input === '/kukup') {
		        				api.sendMessage("HO HO HO", group);
		        				api.changeNickname("Bhuge Dumbass", group, deeb);
		        			}
		        			if(input === '/dab') {
		        				api.sendMessage({attachment: fs.createReadStream('dab.png')}, group);
	        					api.changeNickname("Bhuge Dumbass", group, deeb);
		        			}
		        			if(input === '/gloriousdawn') {
		        				api.sendMessage("HO HO HO", group);
		        					api.changeGroupImage(fs.createReadStream("dab.png"), group, function callback(err) {
				        			if(err) return console.error(err);
				    			});
		        			}
		        			if(input === '/surendrekt') {
		        				api.sendMessage("Surendrekt", group);
		        				api.removeUserFromGroup(me, group, function callback(err){
				        			if(err) return console.error(err);
				    			});
		        			}
		        			if (input.indexOf("/8ball")==0 || input.indexOf("🎱")==0) {
	                			var eightball = 
	                			[
	                			"It is certain",
	                			"It is decidedly so",
	                			"Without a doubt", 
	                			"Yes, definitely",
	                			"Yes, definitely",
	                			"You may rely on it",
	                    		"As I see it, yes",
	                    		"Most likely",
	                    		"Outlook good",
	                    		"Yes",
	                    		"Signs point to yes",
	                    		"Reply hazy try again",
	                    		"Ask again later",
	                    		"Better not tell you now",
	                    		"Cannot predict now",
	                    		"Concentrate and ask again",
	                    		"Don't count on it",
	                    		"My reply is no",
	                    		"My sources say no",
	                    		"Outlook not so good",
	                    		"Very doubtful"];

		               			api.sendMessage(eightball[Math.floor(Math.random()*20)], group);
	            			}
	            			if(input.indexOf("/talk")==0){
								var talking = input.replace("/talk ","");
								bot.create(function(err,Clayton){
									bot.ask(talking,function(err,response){
										api.sendMessage(response,group);
									})
								})
							}
	            		}
		        			
	        			if (event.senderID) {
					        tracking_data[event.senderID]++;
					        str = JSON.stringify(tracking_data, null, 4);
							console.log(str);		        	
				        }

		        	break;

		        case "read_receipt":
		        	if (Math.random() > .99)
		        		api.sendMessage("Well, Tarnum?",group);
		        	break;
		    	}
	        }
	    });
	});
});
