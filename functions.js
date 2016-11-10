var login = require("facebook-chat-api");
const fs = require("fs");
var cleverbot = require('cleverbot.io');
var jsonfile = require('jsonfile');
var extend = require('util')._extend;

//cleverbot stuff
var bot = new cleverbot('TYHRwNcZFicTF4xI','rKarZL4vSevwLDnjLXnGK7MRkBwud1W1');
bot.setNick("clayton");
bot.create(function(err,Clayton){});

//rps stuff
var rpsCountdown;
var gameInProgress = false; //stores if there's an active rps game
var playerOne = "";
var playerTwo = "";
var playerOneHand = ""; //player one choice for rps
var playerTwoHand = ""; //player two choice for rps (defaults to bot)

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
			"Very doubtful"
		];

module.exports = {
	kukUp: function(api, group, deeb) {
		api.sendMessage("HO HO HO", group);
        api.changeNickname("Bhuge Dumbass", group, deeb);
	},
	whip: function(api, group) {
		api.sendMessage({attachment: fs.createReadStream('assets/dab.png')}, group);
	},
	gloriousDawn: function(api, group) {
		api.sendMessage("A still more glorious dawn awaits.", group);
		api.changeGroupImage(fs.createReadStream("assets/tyson.jpg"), group,
		function callback(err) {
			if(err) return console.error(err);
		});
		api.setTitle("THE MOST ASTOUNDING FACT", group, 
		function callback(err,obj) {
			if(err) return console.error(err);
		});
	},
	surendrekt: function(api, group, roon) {
		api.sendMessage("Surendrekt", group);
	    api.removeUserFromGroup(roon, group, function callback(err) {
			if(err) return console.error(err);
		});
	},
	hegg: function(api, group) {
		api.sendMessage({attachment: fs.createReadStream('assets/hegg.gif')}, group);
	},
	ecksDee: function(api, group) {
		api.sendMessage("😂🔫", group);
	},
	compliment: function(api, group, messageEvent) {
		api.getUserInfo(messageEvent.senderID, function callback(err, ret) {
	    	if (err) return console.error(err);
	    	var compliment = "Damn, nice glutes " + 
	    	ret[messageEvent.senderID].firstName + ". Looking thicc.";
	    	api.sendMessage(compliment, group);
	    });
	},
	hoot: function(api, group, threadInfo) {
		var size = Object.keys(threadInfo.participantIDs).length;
	    var randomUser = threadInfo.participantIDs[Math.floor(Math.random() * size)];
	    api.sendMessage("Hoot! You must kill God.", randomUser);
	},
	eightball: function(api, group, messageEvent, deeb) {
		if (messageEvent.senderID == deeb) 
			api.sendMessage("Debarshi, you bitch", group);
		else 
			api.sendMessage(eightball[Math.floor(Math.random()*20)], group);		
	},	
	talk: function(api, group, input) {
		bot.ask(input, function callback(err,response) {
			if (err) return console.error(err);
			api.sendMessage(response,group);
			});
	},	
	jankenPon: function(api, group, challenger) {
		if (!gameInProgress) { //check for existing game before starting a new one	        						        					
		    api.sendMessage("Saisho wa guu!", group);
		    setTimeout(function() {
		    	api.sendMessage("Janken pon!", group);
		    }, 1500);
		    gameInProgress = true; //flag to indicate ongoing game	
		    playerOne = challenger;    
		    //start a countdown to end game if a choice	isn't made in time       							
		    rpsCountdown = setTimeout(function() { 	        					
			   	console.log("Game timed out"); 		        						        					
			   	gameInProgress = false;
			}, 10000);
		}
	},
	jankenPonParse: function(api, group, input) { //parses for valid player input
		if (gameInProgress) {			
			switch (input) { 
				case '/rock': case '/guu': case '✊':
			    	playerOneHand = "✊";      
			    	break; 								        						        					
				case '/paper': case "/paa": case "✋":
			    	playerOneHand = "✋"; 
			    	break; 			        								        						        					
				case '/scissors': case "/choki": case "✌":
			    	playerOneHand = "✌";
			    	break;
			}
			playerTwoHand = ["✊","✋","✌"][Math.floor(Math.random()*3)]; //randomize bot choice	
			//game logic		        								        								        						
			if (playerOneHand !=="") {
			    var winner = "It's a tie!";
			    if (playerOneHand === "✊") {
			    	if (playerTwoHand === "✋")
			    		winner = "bot";
			    	if (playerTwoHand === "✌")
			    		winner = "player";
			    }
			    if (playerOneHand === "✋") {		        							
			    	if (playerTwoHand === "✌")
			    		winner = "bot";
			    	if (playerTwoHand === "✊")
			    		winner = "player";
			    }
			    if (playerOneHand === "✌") {
			    	if (playerTwoHand === "✊")
			    		winner = "bot";
			    	if (playerTwoHand === "✋")
			    		winner = "player";
			    }
			    if(winner === "bot")
			    	winner = "Looks like I win! Naisu."
			    if(winner === "player")
			    	winner = "Looks like you win! Naisu."
		    	clearTimeout(rpsCountdown); //cancel game timeout if game resolves successfully
		    	api.sendMessage(playerTwoHand, group, function callback() {
		    		api.sendMessage(winner, group);	
		   		}); 	
		   		gameInProgress = false;
		   		playerOne = "";
		   		playerTwo = "";	
		    	playerOneHand = "";
		    	playerTwoHand = "";
			}					
		}	
	}
}
