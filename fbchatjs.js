var login = require("facebook-chat-api");
const fs = require("fs");
var jsonfile = require('jsonfile');
var extend = require('util')._extend;
var functions = require('./functions');

login({email: "kenbhone@gmail.com", password: "naisubhig"}, function callback(err, api) {
    if(err) return console.error(err);

    api.setOptions({
      selfListen: true,
      logLevel: "silent"
    });

    var group = '1007807106011631'; //real chat
    var roon = '100000921889753'; //roon's user ID
    var pio = '100006115174010'; //pio's user ID    
    var aaron = '100003952090241'; //aaron's user ID
    var deeb = '1683495739'; //deeb's user ID	

	var testChat = '1144974435591141'; // test chat
    group = testChat;	
	deeb = aaron;

	//data stuff
	var trackingData = {};
	var usageData = {};
	var threadInfo = {};

	// api.sendMessage("Enter B H I G", group);	

    api.getThreadInfo(group, function callback(err, info) {
    	if (err) return console.error(err);
    	threadInfo = info;

		try {
			trackingData = jsonfile.readFileSync('tracking_data.json');
		} catch(err) {
	    	for (var x in threadInfo.participantIDs) {
	    		var y = threadInfo.participantIDs[x];
	    		trackingData[y] = 0;
	    	}
		}

		// make usage data stuff here

	    var stopListening = api.listen(function callback(err, event) {
	        if (err) return console.error(err);
	        if (event.threadID != group) {return;}
	        var input = event.body;
        	if (event.type == "message" && input) {
    			switch(input) {
    				case '/stats':
        				api.getThreadInfo(group, function callback(err, info) {
        					if (err) return console.error(err);
	        				threadInfo = info;
				        	var output = extend({}, trackingData);
				        	for (var x in threadInfo.nicknames) {
				        		if (x in output) {
				        			output[threadInfo.nicknames[x]] = output[x];
									delete output[x];
				        		}
				        	}
				        	var sorted_output = Object.keys(output).sort(function(a,b){return output[a]-output[b]});
				        	api.sendMessage(JSON.stringify(sorted_output, null, 4), group);	        					
        				});
        				break;
        			case '/kukup':	        			
        				functions.kukUp(api, group, deeb);
        				break;
        			case '/dab':
        				functions.dab(api, group);
    					break;
    			    case '/gloriousdawn':
	    				functions.gloriousDawn(api, group);
		    			break;
    				case '/surendrekt':
	    				functions.surendrekt(api, group, roon);
		    			break;
		    		case '/hegg':
	    				functions.hegg(api, group);
		    			break;
		    		case '/XD':
        				functions.ecksDee(api, group);
    				break;
	    			case '/compliment':
	    				functions.compliment(api, group, event)
	    				break;
	    			case '/stopthemadness':
	    				api.sendMessage("fuk the frik off", group);
	    				var file = 'tracking_data.json'
						 
						jsonfile.writeFile(file, trackingData, function (err) {
							if (err) console.error(err);
						})
	    				return stopListening();
	    				break;
	    			case '/hoot':
	    				functions.hoot(api, group, threadInfo)
	    				break;       			
		    		case '/rps': case '/jkp':
		    			functions.jankenPon(api, group, event.senderID);			    				  					        				
		    			break;
		    		case '/rock': case '/guu': case '✊':			    							        						        					
					case '/paper': case "/paa": case "✋":			    				        								        						        					
					case '/scissors': case "/choki": case "✌":			    	
		    			functions.jankenPonParser(api, group, input);			    				  					        				
		    			break;
		    		default:  
		    			if (input.indexOf("/8ball")==0 || input.indexOf("🎱")==0) 
		            		functions.eightball(api, group, event, deeb)		    			
		    			else if(input.indexOf("/talk")==0) 
		    				functions.talk(api, group, input.replace("/talk ",""));						
						else if(input.search("Clayyton") >= 0 || input.search("clayyton") >= 0) 
							functions.talk(api, group, input);
	    		}	    

	    		if (Math.random() > .99) 
		        	functions.talk(api, group, input);		        
				if (event.senderID) 
					trackingData[event.senderID]++;		        	
		    }

	        else if (event.type == "read_receipt"){
	        	if (Math.random() > .80 && event.reader == roon)
	        		api.sendMessage("Well, Tarnum?",group);
	        }
	    });
	});
});
