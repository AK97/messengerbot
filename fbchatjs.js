var login = require("facebook-chat-api");
const fs = require("fs");
var cleverbot = require('cleverbot.io');
var jsonfile = require('jsonfile');
var extend = require('util')._extend;


var bot = new cleverbot('TYHRwNcZFicTF4xI','rKarZL4vSevwLDnjLXnGK7MRkBwud1W1');
bot.setNick("clayton");
bot.create(function(err,Clayton){});

login({email: "clayytonbhig@gmail.com", password: "naisubhig"}, function callback (err, api) {
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
	var thread_info = {};
	var deeb = '1683495739'; //deeb's user ID

	var test_chat = '1144974435591141'; // test chat
    group = test_chat;
	var aaron = '100003952090241'; //aaron's user ID
	deeb = aaron;


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
    	thread_info = info;

		try {
			tracking_data = jsonfile.readFileSync('tracking_data.json');
		} catch(err) {
	    	for (var x in thread_info.participantIDs) {
	    		var y = thread_info.participantIDs[x];
	    		tracking_data[y] = 0;
	    	}
		}

		// make usage data stuff here

	    var stopListening = api.listen(function(err, event) {
	        if (err) return console.error(err);
	        if (event.threadID != group) {return;}
	        var input = event.body;
        	if (event.type == "message" && input) {
    			switch(input) {
    				case '/status':
        				api.getThreadInfo(group, function(err, info) {
        					if (err) return console.error(err);
	        				thread_info = info;
				        	var output = extend({}, tracking_data);
				        	for (var x in thread_info.nicknames) {
				        		if (x in output) {
				        			output[thread_info.nicknames[x]] = output[x];
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
        			case '/dab':
        				api.sendMessage({attachment: fs.createReadStream('dab.png')}, group);
    					break;
    			    case '/gloriousdawn':
	    				api.sendMessage("A still more glorious dawn awaits.", group);
						api.changeGroupImage(fs.createReadStream("tyson.jpg"), group, function callback(err) {
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
	    				api.sendMessage({attachment: fs.createReadStream('hegg.gif')}, group);
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
	    				var file = 'tracking_data.json'
						 
						jsonfile.writeFile(file, tracking_data, function (err) {
							if (err) console.error(err);
						})
	    				return stopListening();
	    				break;
	    			case '/hoot':
	    				var size = Object.keys(thread_info.participantIDs).length;
	    				var randomUser = thread_info.participantIDs[Math.floor(Math.random() * size)];
	    				api.sendMessage("Hoot! You must kill God.", randomUser);
	    				break;
		    		default:        			
		    			if(input === '/rps' || input === "/jkp" || gameInProgress) {
		    				if (!gameInProgress) {	//makes sure there isn't an ongoing game before starting a new one	        						        					
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
			    				return;
		    				}
		    				//set playerHand as per valid user input
		    					if(input === '/rock' || input === "/guu" || input === "✊") 
		    						playerHand = "✊";       								        						        					
		    					if(input === '/paper' || input === "/paa" || input === "✋") 
		    						playerHand = "✋";  			        								        						        					
		    					if(input === '/scissors' || input === "/choki" || input === "✌") 
		    						playerHand = "✌";
		    					//game logic		        								        								        						
		    					if (playerHand === "✊" || playerHand === "✋" || playerHand === "✌" ) {
		    						var winner = "It's a tie!";
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
		    						api.sendMessage(botHand + "\n" + winner, group);
		    					}					        					   		        				    				  					        				
		    			}
		    			if (input.indexOf("/8ball")==0 || input.indexOf("🎱")==0) {
		            		if (event.senderID == deeb) {
		            			api.sendMessage("Debarshi, you bitch", group);
		            		} else {
		               			api.sendMessage(eightball[Math.floor(Math.random()*20)], group);
		            		}
		    			}
		    			if(input.indexOf("/talk")==0){
							var talking = input.replace("/talk ","");
							bot.ask(talking,function(err,response){
								if (err) return console.error(err);
								api.sendMessage(response,group);
							});
						}
						if(input.search("Clayyton") >= 0 or input.search("clayyton") >= 0) {
							bot.ask(input,function(err,response){
								if (err) return console.error(err);
								api.sendMessage(response,group);
							});
						}
	    		}
	    		if (Math.random() > .99) {
		        	bot.ask(input, function(err, response) {
						if (err) return console.error(err);
		        		api.sendMessage(response, group);
		        	});
		        }
				if (event.senderID) tracking_data[event.senderID]++;		        	
		    }
	        else if (event.type == "read_receipt"){
	        	if (Math.random() > .80 && event.reader == roon)
	        		api.sendMessage("Well, Tarnum?",group);
	        }
	    });
	});
});
