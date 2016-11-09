var login = require("facebook-chat-api");
const fs = require("fs");
var cleverbot = require('cleverbot.io');
var jsonfile = require('jsonfile');
var extend = require('util')._extend;

module.exports = {
	kukup: function(api, group, deeb) {
		api.sendMessage("HO HO HO", group);
        api.changeNickname("Bhuge Dumbass", group, deeb);
	},
	dab: function(api, group) {
		api.sendMessage({attachment: fs.createReadStream('dab.png')}, group);
	},
	gloriousDawn: function(api, group) {
		api.sendMessage("A still more glorious dawn awaits.", group);
		api.changeGroupImage(fs.createReadStream("tyson.jpg"), group, function callback(err) {
	   		if(err) return console.error(err);
	   	});
		api.setTitle("THE MOST ASTOUNDING FACT", group, function(err,obj){});
	},
	surendrekt: function(api, group, roon) {
		api.sendMessage("Surendrekt", group);
	    api.removeUserFromGroup(roon, group, function callback(err) {
			if(err) return console.error(err);
		});
	},
	hegg: function(api, group) {
		api.sendMessage({attachment: fs.createReadStream('hegg.gif')}, group);
	},
	compliment: function(api, group, messageEvent) {
		api.getUserInfo(messageEvent.senderID, function(err, ret) {
	    	if (err) return console.error(err);
	    	var compliment = "Damn, nice glutes " + ret[messageEvent.senderID].firstName + ". Looking thicc.";
	    	api.sendMessage(compliment, group);
	    });
	},
	hoot: function(api, group, threadInfo) {
		var size = Object.keys(threadInfo.participantIDs).length;
	    var randomUser = threadInfo.participantIDs[Math.floor(Math.random() * size)];
	    api.sendMessage("Hoot! You must kill God.", randomUser);
	},
}
