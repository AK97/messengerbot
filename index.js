///// SETUP /////

var login = require('facebook-chat-api');
var Account = require('./assets/login.json');
var abilities = require('./abilities.js')
var NAMEOF = require('./assets/users.json');

const login_email = Account.email;
const login_password = Account.password;
const SELF_ID = Account.account_id;
const SELF_NAME = Account.name;

const ANNOYING_FRIEND = ''; // Someone's fb profile ID
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

        if (event.type == 'message' || event.type == 'message_reply') {

            // Always immediately mark as read, to indicate it's alive and listening
            api.markAsRead(event.threadID, (err) => {
                if(err) console.log(err);
            });

            let sender = event.senderID;
            let message = event.body.toLowerCase();
            let chat = event.threadID;

            // Commands
            
            switch(message.split(' ')[0]) {
                case '!help': case '!h': case '!menu': case `!${SELF_NAME.toLowerCase()}`:
                    abilities.help(api, chat, NAMEOF[ANNOYING_FRIEND]);
                    break;
                case '!flipacoin': case '!flip': case '!coin':
                    abilities.flipACoin(api, chat);
                    break;
                case '!rolldice': case '!roll': case '!dice':
                    abilities.rollDice(api, chat);
                    break;
                case `!${NAMEOF[ANNOYING_FRIEND].toLowerCase()}`:
                    abilities.tellAFtoSTFU(api, chat, ANNOYING_FRIEND, NAMEOF[ANNOYING_FRIEND]);
                    break;
                case '!crystalball': case '!8ball': case '!eightball': case '!future':
                    abilities.crystalBall(api, chat);
                    break;
                case '!rps': case '!rockpaperscissors':
                    abilities.rps(api, chat, sender, message);
                    break;
                case '!name':
                    abilities.randomName(api, chat);
                    break;
                case '!cocktail': case '!drink': case '!drinks':
                    abilities.cocktail(api, chat, message, sender);
                    break;
                case '!covid': case '!coronavirus': case '!covid19':
                    abilities.covid(api, chat, message);
                    break;
                case '!news': case '!breaking':
                    abilities.news(api, chat, message);
                    break;
                case '!weather':
                    abilities.weather(api, chat, message);
                    break;
                case '!alert': case '!notify':
                    abilities.alert(api, chat, event.body);
                    break;
                case '!food': case '!recipe':
                    abilities.recipes(api, chat, message);
                    break;
                case '!wine': case '!vino':
                    abilities.wine(api, chat, message, sender);
                    break;
                case '!trivia':
                    abilities.trivia(api, chat);
                    break;
                case '!pics': case '!images': case 'pictures':
                    abilities.images(api, chat, message);
                    break;
                default:
                    if (message.includes(SELF_NAME.toLowerCase())) {
                        abilities.greet(api, chat, message, event.messageID);
                    }
                    else if (event.mentions[SELF_ID]) {
                        abilities.introduceSelf(api, chat);
                    }
                    else if (message.includes('drink') || message.includes('darty')) {
                        abilities.letsDrink(api, chat);
                    }
                    else if (sender == ANNOYING_FRIEND) {
                        abilities.respondToAF(api, chat, ANNOYING_FRIEND, NAMEOF[ANNOYING_FRIEND]);
                    }
                    break;
            }
        }
        else if (event.type != 'presence') {
            // 'presence' events are when fb friends of the bot come online. Don't care.
            console.log(event); // For debugging purposes
        }
    });
});