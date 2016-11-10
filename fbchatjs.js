var login = require("facebook-chat-api");
const fs = require("fs");
var cleverbot = require('cleverbot.io');
var jsonfile = require('jsonfile');
var extend = require('util')._extend;


var bot = new cleverbot('TYHRwNcZFicTF4xI','rKarZL4vSevwLDnjLXnGK7MRkBwud1W1');
bot.setNick("clayton");
bot.create(function(err,Clayton){});

login({email: "kenbhone@gmail.com", password: "naisubhig"}, function callback (err, api) {
    if(err) return console.error(err);

    api.setOptions({
      selfListen: true,
      logLevel: "silent"
    });

    var group = '1007807106011631'; //real chat
    var roon = '100000921889753'; //roon's user ID
    var pio = '100006115174010'; //pio's user ID
	var tracking_data = {};
	var usage_data = {};
	var deeb = '1683495739'; //deeb's user ID

	// var test_chat = '1144974435591141'; // test chat
 //    group = test_chat;
	// var aaron = '100003952090241'; //aaron's user ID
	// deeb = aaron;


	// api.sendMessage("Enter B H I G", group);

	// rps stuff
	var rpsCountdown;
	var gameInProgress = false; //stores whether there's an active rock-paper-scissors game
	var playerHand = ""; //player choice for rps
	var botHand = ""; //bot choice for rps

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

    api.getThreadInfo(group, function(err, info) {
    	if (err) return console.error(err);

		try {
			tracking_data = jsonfile.readFileSync('json/tracking_data.json');
		} catch(err) {
	    	for (var x in info.participantIDs) {
	    		var y = info.participantIDs[x];
	    		tracking_data[y] = 0;
	    	}
		}

		// make usage data stuff here
		try {
			usage_data = jsonfile.readFileSync('json/usage_data.json');
		} catch(err) {}


	    var stopListening = api.listen(function(err, event) {
	        if (err) return console.error(err);
	        if (event.threadID != group) return;
	        var input = event.body;
	        function case_usage() {
				if (usage_data[input]) usage_data[input]++; else usage_data[input] = 1;
	        }
	        var cases = true;
        	if (event.type == "message" && input) {
    			switch(input) {
    				case '/stats':
        				api.getThreadInfo(group, function(err, info) {
        					if (err) return console.error(err);
				        	var output = extend({}, tracking_data);
				        	var sorted_output = [];
				        	var size = Object.size(tracking_data);
				        	for (var i = 0; i < size; i++) {
				        		var min = 1000000;
				        		var minUser = "";
				        		for (var x in output) {
				        			if (output[x] < min) {
				        				min = output[x];
				        				minUser = x;
				        			}
					        	}
					        	sorted_output[i] = {minUser, min};
				        	}

				        	printed_output = "Message sent:";

				        	for (var x in sorted_output) {
				        		y = Object.keys(obj);
				        		key = y[0];
				        		printed_output = printed_output + key + ": " + x[key] + '/n';
				        	}
				        	

				        	for (var x in info.nicknames) {
				        		if (x in output) {
				        			output[info.nicknames[x]] = output[x];
									delete output[x];
				        		}
				        	}
				        	var sorted_output = Object.keys(output).sort(function(a,b){return output[a]-output[b]});
				        	api.sendMessage(JSON.stringify(sorted_output, null, 4), group);	        					
        				});
        				break;
        			case '/kukup':	        			
        				api.sendMessage("HO HO HO", group);
        				api.changeNickname("Bhuge Dumbass", group, deeb);
        				break;
        			case '/whip':
        				api.sendMessage({attachment: fs.createReadStream('assets/dab.png')}, group);
    					break;
    			    case '/gloriousdawn':
	    				api.sendMessage("A still more glorious dawn awaits.", group);
						api.changeGroupImage(fs.createReadStream("assets/tyson.jpg"), group, function callback(err) {
	        				if(err) return console.error(err);
		    			});
		    			api.setTitle("THE MOST ASTOUNDING FACT", group, function(err,obj){});
		    			break;
    				case '/surendrekt':
	    				api.sendMessage("Surendrekt", group);
	    				api.removeUserFromGroup(roon, group, function callback(err){
		        			if(err) return console.error(err);
		    			});
		    			break;
		    		case '/hegg':
	    				api.sendMessage({attachment: fs.createReadStream('assets/hegg.gif')}, group);
		    			break;
	    			case '/compliment':
	    				api.getUserInfo(event.senderID, function(err, ret){
	    					if (err) return console.error(err);
	    					var compliment = "Damn, nice glutes " + ret[event.senderID].firstName + ". Looking thicc.";
	    					api.sendMessage(compliment, group);
	    				});
	    				break;
	    			case '/stopthemadness':
	    				api.sendMessage("fuk the frik off", group);
						jsonfile.writeFile('json/tracking_data.json', tracking_data, function (err) {
							if (err) console.error(err);
						});
						jsonfile.writeFile('json/usage_data.json', usage_data, function (err) {
							if (err) console.error(err);
						});
	    				return stopListening();
	    				break;
	    			case '/hoot':
	    				var size = Object.keys(info.participantIDs).length;
	    				var randomUser = info.participantIDs[Math.floor(Math.random() * size)];
	    				api.sendMessage("Hoot! You must kill God.", randomUser);
	    				break;
	    			case '/rps':
	    			case '/jkp':
	    				api.sendMessage("Saisho wa guu!", group);
    					setTimeout(function() {
    						api.sendMessage("Janken pon!", group) }, 1500);
    					gameInProgress = true; //flag to make sure new games can't start until this one is done
    					botHand = ["✊","✋","✌"][Math.floor(Math.random()*3)]; //randomize bot choice	
    					//start a countdown to end the game if the player doesn't make a choice	in time       							
    						rpsCountdown = setTimeout(function() { 	        					
	    						console.log("Game timed out"); 		        						        					
	    						gameInProgress = false;
	    					}, 10000);
	    				break;
		    		default:
		    			// rps stuff
		    			cases = false;        			
		    			if (gameInProgress) {
		    				var playerHand = undefined;
		    				//set playerHand as per valid user input
	    					if(input === '/rock' || input === "/guu" || input === "✊") 
	    						playerHand = "✊";       								        						        					
	    					if(input === '/paper' || input === "/paa" || input === "✋") 
	    						playerHand = "✋";  			        								        						        					
	    					if(input === '/scissors' || input === "/choki" || input === "✌") 
	    						playerHand = "✌";
	    					//game logic		        								        								        						
	    					if (playerHand === "✊" || playerHand === "✋" || playerHand === "✌" ) {
	    						var winner = "Tie";
	    						if (playerHand === "✊") {
	    							if (botHand === "✋")
	    								winner = "bot";
	    							if (botHand === "✌")
	    								winner = "player";
	    						}
	    						if (playerHand === "✋") {		        							
	    							if (botHand === "✌")
	    								winner = "bot";
	    							if (botHand === "✊")
	    								winner = "player";
	    						}
	    						if (playerHand === "✌") {
	    							if (botHand === "✊")
	    								winner = "bot";
	    							if (botHand === "✋")
	    								winner = "player";
	    						}
	    						if(winner === "bot")
	    							winner = "Looks like I win! Naisu."
	    						if(winner === "player")
	    							winner = "Looks like you win! Naisu."	    						
	    						clearTimeout(rpsCountdown); //cancel game timeout if game resolves successfully
		    						gameInProgress = false;	
		    						playerHand = "";	
		    						api.sendMessage(botHand, group, function() {
		    							api.sendMessage(winner, group);	
		    						}); 						
		    					}		
			    			}						        					   		        				    				  					        				
		    			if (input.indexOf("/8ball")==0 || input.indexOf("🎱")==0) {
		            		if (event.senderID == deeb) {
		            			api.sendMessage("Debarshi, you bitch", group);
		            		} else {
		               			api.sendMessage(eightball[Math.floor(Math.random()*20)], group);
		            		}
		            		if (usage_data['/8ball']) usage_data['/8ball']++; else usage_data['/8ball'] = 1;
		    			}
		    			else if(input.indexOf("/talk")==0 || input.indexOf("/t")==0){
							var talking = input.replace("/talk ","");
							bot.ask(talking,function(err,response){
								if (err) return console.error(err);
								api.sendMessage(response,group);
							});
		            		if (usage_data['/talk']) usage_data['/talk']++; else usage_data['/talk'] = 1;
						}

						else if(input.search("Clayyton") >= 0 || input.search("clayyton") >= 0) {
							var talking = input.replace("Clayyton","");
							talking = talking.replace("clayyton","");
							bot.ask(talking,function(err,response){
								if (err) return console.error(err);
								api.sendMessage(response,group);
							});
		            		if (usage_data['/talk']) usage_data['/talk']++; else usage_data['/talk'] = 1;
						}
	    		}
	    		if (Math.random() > .99) {
		        	bot.ask(input, function(err, response) {
						if (err) return console.error(err);
		        		api.sendMessage(response, group);
		        	});
		        }

		        // data
	    		if (cases) case_usage();
				if (event.senderID) tracking_data[event.senderID]++;
				console.log(event);		        	
		    }
	        else if (event.type == "read_receipt"){
	        	if (Math.random() > .80 && event.reader == roon)
	        		api.sendMessage("Well, Tarnum?",group);
	        }
	    });
	});
});
