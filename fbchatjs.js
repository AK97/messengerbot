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

	/*var testChat = '1144974435591141'; // test chat
    group = testChat;	
	deeb = aaron;*/

	//data stuff
	var trackingData = {};
	var usageData = {};

	// api.sendMessage("Enter B H I G", group);	

    api.getThreadInfo(group, function callback(err, info) {
    	if (err) return console.error(err);

		try {
			trackingData = jsonfile.readFileSync('json/tracking_data.json');
		} catch(err) {
	    	for (var x in info.participantIDs) {
	    		var y = info.participantIDs[x];
	    		trackingData[y] = 0;
	    	}
		}

		// make usage data stuff here
		try {
			usageData = jsonfile.readFileSync('json/usage_data.json');
		}
		catch(error) {}

	    var stopListening = api.listen(function callback(err, event) {
	        if (err) return console.error(err);
	        if (event.threadID != group) 
	        	return;
	        var input = event.body;
	        function caseUsage() {
	        	if (usageData[input])
	        		usageData[input]++;
	        	else
	        		usageData[input] = 1;
	        }
	        var cases = true;
        	if (event.type == "message" && input) {
    			switch(input) {
    				case '/stats':
        				api.getThreadInfo(group, function callback(err, info) {
        					if (err) return console.error(err);
				        	var output = extend({}, trackingData);
				        	var sortedOutput = [];
				        	var size = Object.keys(trackingData).length;
				        	for (var i = 0; i < size; i++) {
				        		var min = 1000000;
				        		var minUser = "";
				        		for (var x in output) {
				        			if (output[x] < min) {
				        				min = output[x];
				        				minUser = x;
				        			}
					        	}
					        	sortedOutput[i] = {minUser, min};
				        	}

				        	printedOutput = "Message sent:";
 
 				        	for (var x in sortedOutput) {
 				        		y = Object.keys(sortedOutput);
 				        		key = y[0];
 				        		printedOutput = printedOutput + key + ": " + x[key] + '/n';
 				        	} 				        	
 
 				        	for (var x in info.nicknames) {
				        		if (x in output) {
				        			output[info.nicknames[x]] = output[x];
									delete output[x];
				        		}
				        	}
				        	var sortedOutput = Object.keys(output).sort(function(a,b){return output[a]-output[b]});
				        	api.sendMessage(JSON.stringify(sortedOutput, null, 4), group);	        					
        				});
        				break;
        			case '/kukup':	        			
        				functions.kukUp(api, group, deeb);
        				break;
        			case '/whip':
        				functions.whip(api, group);
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
	    				json.writeFile('json/tracking_data.json', trackingData, function callback (err)
	    				{
	    					if (err) return console.error(err);
	    				});						 
	    				return stopListening();
	    				break;
	    			case '/hoot':
	    				functions.hoot(api, group, info)
	    				break;       			
		    		case '/rps': case '/jkp':
		    			functions.jankenPon(api, group, event.senderID);	
		    			input = '/rps';		    				  					        				
		    			break;
		    		case '/rock': case '/guu': case '✊':			    							        						        					
					case '/paper': case '/paa': case '✋':			    				        								        						        					
					case '/scissors': case '/choki': case '✌':			    	
		    			functions.jankenPonParser(api, group, input);
		    			cases = false;			    				  					        				
		    			break;
		    		default:
		    			cases = false;  
		    			if (input.indexOf("/8ball") == 0 || input.indexOf("🎱") == 0) {
		            		functions.eightball(api, group, event, deeb);
		            		if (usageData['/8ball']) 
		            			usageData['/8ball']++; 
		            		else 
		            			usageData['/8ball'] = 1;	    			
		    			}
		    			else if (input.indexOf("/talk") == 0 || input.indexOf("/t") == 0) 
		    			{
		    				var talking = input.replace("/talk","");
 							talking = talking.replace("/t","");
		    				functions.talk(api, group, talking);		    					
		    				if (usageData['/talk'])
		    					usageData['/talk']++; 
		    				else 
		    					usageData['/talk'] = 1;				
		    			}
						else if (input.search("Clayyton") >= 0 || input.search("clayyton") >= 0) 
						{
							var talking = input.replace("Clayyton","");
 							talking = talking.replace("clayyton","");
							functions.talk(api, group, talking);
							if (usageData['/talk']) 
								usageData['/talk']++; 
							else 
								usageData['/talk'] = 1;
						}
	    		}	    

	    		if (Math.random() > .99) 
		        	functions.talk(api, group, input);	
		        // data
 	    		if (cases) 
 	    			caseUsage(); 				        
				if (event.senderID) {
					trackingData[event.senderID]++;	
					console.log(event);
				}	        	
		    }

	        else if (event.type == "read_receipt"){
	        	if (Math.random() > .80 && event.reader == roon)
	        		api.sendMessage("Well, Tarnum?",group);
	        }
	    });
	});
});
