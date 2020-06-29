///// SETUP /////

var login = require("facebook-chat-api");
var Account = require('./assets/login.json');
var abilities = require('./abilities.js')
var NAMEOF = require('./assets/users.json');

const login_email = Account.email;
const login_password = Account.password;
const SELF_ID = Account.account_id;
const SELF_NAME = Account.name;

const ANNOYING_FRIEND = '100001372635682'; // Someone's fb profile ID
// Listed name for AF should be one word or it wont work as it stands rn

///// RUN (LOG IN AND LISTEN) /////

login({email: login_email, password: login_password}, function callback(err, api) {
    if(err) return console.error(err);

    api.setOptions({
        listenEvents: true,
        selfListen: false,
        logLevel: "silent"
    });

    var stopListening = api.listenMqtt((err, event) => {
        if(err) return console.error(err);

        if (event.type == "message") {

            // Always immediately mark as read, to indicate it's alive and listening
            api.markAsRead(event.threadID, (err) => {
                if(err) console.log(err);
            });

            let sender = event.senderID;
            let message = event.body.toLowerCase();

            // Commands

            switch(message.split(' ')[0]) {
                case '!help':
                    abilities.help(api, event.threadID);
                    break;
                case '!flipacoin':
                    abilities.flipACoin(api, event.threadID);
                    break;
                case '!rolldice':
                    abilities.rollDice(api, event.threadID);
                    break;
                case `!${NAMEOF[ANNOYING_FRIEND].toLowerCase()}`:
                    abilities.tellAFToSTFU(api, event.threadID, ANNOYING_FRIEND);
                    break;
                case '!crystalball':
                    abilities.crystalBall(api, event.threadID);
                    break;
                case '!rps':
                    abilities.rps(api, event.threadID, sender, message);
                    break;
                case '!name':
                    abilities.randomName(api, event.threadID);
                    break;
                case '!cocktail':
                    abilities.cocktail(api, event.threadID, message, sender);
                    break;
                case '!covid':
                    abilities.covid(api, event.threadID, message);
                    break;
                case '!news':
                    abilities.news(api, event.threadID, message);
                    break;
                case '!weather':
                    abilities.weather(api, event.threadID, message);
                    break;
                case '!alert':
                    abilities.alert(api, event.threadID, event.body);
                    break;
                case '!food':
                    abilities.recipes(api, event.threadID, message);
                    break;
                case '!wine':
                    abilities.wine(api, event.threadID, message, sender);
                    break;
                case '!trivia':
                    abilities.trivia(api, event.threadID);
                    break;
                default:
                    if (sender == ANNOYING_FRIEND) {
                        abilities.respondToAF(api, event.threadID, ANNOYING_FRIEND);
                    }
                    if (event.mentions[SELF_ID]) {
                        abilities.introduceSelf(api, event.threadID);
                    }
                    if (message.includes('drink')) {
                        abilities.letsDrink(api, event.threadID);
                    }
                    if (message.includes('darty')) {
                        abilities.letsDrink(api, event.threadID);
                    }
                    if (message.includes(SELF_NAME.toLowerCase())) {
                        abilities.greet(api, event.threadID);
                    }
                    break;
            }

        }
        else {
            console.log(event);
        }
    });
});