///// SETUP /////

var https = require('https');
var he = require('he');
var NewsAPI = require('newsapi');
var Account = require('./assets/login.json');
var NAMEOF = require('./assets/users.json');

const NAMELIST = require('./assets/names.js');

const WEATHER_API_KEY = Account.weather_api_key;
const NEWS_API_KEY = Account.news_api_key;
const FOOD_API_KEY = Account.food_api_key;
const SELF_ID = Account.account_id;
const SELF_NAME = Account.name;
const SELF_GREETING = Account.greeting;

var newsapi = new NewsAPI(NEWS_API_KEY);

const ANNOYING_FRIEND = '100001372635682'; // Someone's fb profile ID
// Listed name for AF should be one word or it wont work as it stands rn

///// ABILITIES /////

function randomNumberBetween(min, max) {
    // Inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function respondToAF(api, group, target) {
    if (!randomNumberBetween(0,4)) {
        api.sendMessage(`Shut up, ${NAMEOF[target]}`, group)
    }
}

function tellAFToSTFU(api, group, target) {
    api.sendMessage({
        body: `@${NAMEOF[target]}, SHUT THE FUCK UP`,
        mentions: [{
             tag: `@${NAMEOF[target]}`,
             id: target
        }],
    }, group);
}

function help(api, group) {
    let helpmenu = [
        '!flipacoin: Flip a coin',
        '!rolldice: Roll two dice',
        `!${NAMEOF[ANNOYING_FRIEND].toLowerCase()}: Useful shorthand message`,
        '!crystalball: See the future',
        '!rps [rock/paper/scissors]: Play RPS',
        '!name: Need a name?',
        '!covid [country?]: Get the latest numbers',
        '!news [keyword?]: Recent headlines',
        '!weather [zip/city]: Current weather',
        '!alert [message]: Notify everyone',
        '!food [keywords?]: Suggestions and recipes',
        '!wine [type]: Only the finest',
        '!cocktail [ingredient?]: Drink suggestions',
        '!trivia: Test your knowledge'
    ];
    api.sendMessage(helpmenu.join('\n'), group);
}

function introduceSelf(api, group) {
    api.sendMessage(`Hi, I\'m ${SELF_NAME}. ${SELF_GREETING}`, group);
}

function greet(api, group) {
    let greetings = [
        'What up',
        'Sup',
        'Yo',
        'Whats goin on',
        `I am ${SELF_NAME}`,
        'Hi',
        'Hello',
        'Are you talking to me?',
        'Are you talking about me?',
        'Hey',
        'What',
        'That\'s my name don\'t wear it out',
        'What do you want'
    ];
    let outcome = greetings[randomNumberBetween(0, greetings.length-1)];
    api.sendMessage(outcome, group);
}

function flipACoin(api, group) {
    let outcome = randomNumberBetween(0,1) ? 'It\'s Heads.' : 'It\'s Tails.'
    api.sendMessage('Flipping a coin...', group, function() {
        api.sendMessage(outcome, group);
    });
}

function rollDice(api, group) {
    var FACES = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'];
    let dice = [randomNumberBetween(1,6), randomNumberBetween(1,6)]
    let total = dice[0] + dice[1];
    let outcome = 'Rolled a ' + FACES[dice[0]-1] + ' and a ' + FACES[dice[1]-1] + '. Total: ' + total;
    api.sendMessage('Rolling the dice...', group, function() {
        api.sendMessage(outcome, group);
    });
}

function crystalBall(api, group) {
    let options = [
        "It is certain",
        "It is decidedly so",
        "Without a doubt", 
        "Yes, definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook is good",
        "Yes",
        "Signs point to yes",
        "Reply hazy, try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "Does not seem likely",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful",
        "No chance",
        "Nah dude",
        "Nope"
    ];
    let outcome = 'The crystal ball says... ' + options[randomNumberBetween(0, options.length-1)];
    api.sendMessage(outcome, group);
}

function rps(api, group, player, message) {
    playername = NAMEOF[player] || 'wanna play again?';
    if (message.split(' ').length >= 2) {
        if (['rock', 'paper', 'scissors'].includes(message.split(' ')[1])) {
            let player_choice = message.split(' ')[1];
            let bot_choice = ['rock', 'paper', 'scissors'][randomNumberBetween(0,2)];

            if (bot_choice == player_choice) {
                api.sendMessage(bot_choice + '!', group, function() {
                    api.sendMessage('It\'s a tie, ' + playername, group);
                });
            }
            else if ((bot_choice == 'rock' && player_choice == 'scissors') || (bot_choice == 'scissors' && player_choice == 'paper') || (bot_choice == 'paper' && player_choice == 'rock')) {
                api.sendMessage(bot_choice + '!', group, function() {
                    api.sendMessage('I win! You lose, ' + playername, group);
                });
            }
            else {
                api.sendMessage(bot_choice + '!', group, function() {
                    api.sendMessage('You win, ' + playername + '.', group);
                });
            }
        }
        else {
            api.sendMessage('Play by saying, for example, "!rps rock"', group);
        }
    }
    else {
        api.sendMessage('Play by saying, for example, "!rps rock"', group);
    }
}

function letsDrink(api, group) {
    let options = [
        'did somebody say drink 👀',
        'did somebody say drink 👀',
        'did somebody say drink 👀',
        'did somebody say drink 👀',
        'did somebody say drink 👀',
        'did somebody say drink 👀👀',
        'did somebody say drink 🧐',
        'did somebody say drink 🤨',
        'let\'s DRINKKKK',
        'LETS FUCKEN DRINK',
        'yo lets drink?',
        'lets party',
        'should we drink',
        'its a good time to party',
        'drink rn?'
    ];
    let outcome = options[randomNumberBetween(0, options.length-1)];
    api.sendMessage(outcome, group);
}

function randomName(api, group) {
    let options = NAMELIST.NAMES;
    let outcome = options[randomNumberBetween(0, options.length-1)];
    api.sendMessage('Here\'s a name... ' + outcome, group);
}

function cocktail(api, group, message, sender) {
    var message = message.split(' ');
    if (!randomNumberBetween(0,9)) {
        api.sendMessage('Here\'s a suggestion: stop drinking, ya alcoholic', group);
        return null;
    }
    if (!randomNumberBetween(0,9)) {
        api.sendMessage('Have you tried water? You degenerate', group);
        return null;
    }
    if (message.length == 1) {
        let url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
        var response;
        https.get(url, function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                response = JSON.parse(body);
                let choice = response['drinks'][0];
                var ingList = [];
                for (var i = 1; i < 20; i++) {
                    if (choice['strIngredient'+i]) {
                        ingList.push(choice['strIngredient'+i]);
                    }
                }
                let article = ['a','e','i','o','u'].includes(choice.strDrink[0].toLowerCase()) ? ' an ' : ' a ';
                let outcome = 'Okay, ' + NAMEOF[sender] + ', you alcoholic: I suggest' + article + choice.strDrink + '\nIt\'s made with ' + ingList.join(', ');
                api.sendMessage(outcome, group);
            });
        }).on('error', function(e){
                console.log("Got an error trying to get cocktails: ", e);
        });
    }
    else {
        message.splice(0, 1);
        message = message.join(' ');
        let pi_url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
        var possible_ingredients = [];
        var response;
        https.get(pi_url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                response = JSON.parse(body);
                for (var pi = 0; pi < response['drinks'].length; pi++) {
                    possible_ingredients.push(response['drinks'][pi]['strIngredient1'].toLowerCase());
                }
                // console.log(message, possible_ingredients);
                let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + message;
                var response;
                https.get(url, function(res) {
                    var body = '';
                    res.on('data', function(chunk) {
                        body += chunk;
                    });
                    res.on('end', function() {
                        response = JSON.parse(body);
                        let options = response['drinks'];
                        let choice = options[randomNumberBetween(0, options.length-1)];
                        let article = ['a','e','i','o','u'].includes(choice.strDrink[0].toLowerCase()) ? ' an ' : ' a ';
                        let drinkPage = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + choice.idDrink;
                        var secondresponse;
                        https.get(drinkPage, function(res) {
                            var body = '';
                            res.on('data', function(chunk) {
                                body += chunk;
                            });
                            res.on('end', function() {
                                secondresponse = JSON.parse(body);
                                if(secondresponse['drinks']) {
                                    let choice2 = secondresponse['drinks'][0];
                                    var ingList = [];
                                    for (var i = 1; i < 20; i++) {
                                        if (choice2['strIngredient'+i]) {
                                            ingList.push(choice2['strIngredient'+i]);
                                        }
                                    }
                                    let outcome = 'If you want something with ' + message + ', consider making' + article + choice.strDrink + '\nIt\'s made with ' + ingList.join(', ');
                                    api.sendMessage(outcome, group);
                                }
                                else {
                                    let random_ingredient = possible_ingredients[randomNumberBetween(0, possible_ingredients.length-1)];
                                    api.sendMessage(`I dont recognize that ingredient. Try saying something like, "!cocktail ${random_ingredient}"`, group);
                                }
                            });
                        }).on('error', function(e){
                                console.log("Got an error trying to get specific cocktail info: ", e);
                        });
                    });
                }).on('error', function(e){
                    console.log("Got an error trying to get cocktails", e);
                });
            });
        }).on('error', function(e){
            console.log("Got an error trying to get ingredient list: ", e);
        });
    }
}

function covid(api, group, message) {
    var options = {
        'method': 'GET',
        'hostname': 'api.covid19api.com',
        'path': '/summary',
        'headers': {},
        'maxRedirects': 20
    };
    var req = https.request(options, function (res) {
        var chunks = [];
        
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        
        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            var result = JSON.parse(body);
            if (message.split(' ').length == 1) {
                // Just !covid. Return worldly results
                let global = result['Global'];
                let outcome = `${global.NewConfirmed} new cases today, bringing global total to ${global.TotalConfirmed}.\nAs of today, ${global.TotalDeaths} total deaths have been recorded worldwide.`;
                api.sendMessage(outcome, group);
            }
            else {
                // A country was specified
                let splt = message.split(' ');
                splt.splice(0,1);
                let query = splt.join(' ');
                let countries = result['Countries'];
                let chosen = countries.find(c => (c.Country.toLowerCase() == query || c.CountryCode.toLowerCase() == query));
                if (chosen) {
                    let outcome = `${chosen.NewConfirmed} new cases today in ${chosen.Country}.\nThey now have had ${chosen.TotalConfirmed} reported cases and ${chosen.TotalDeaths} deaths`;
                    api.sendMessage(outcome, group);
                }
                else {
                    api.sendMessage('I don\'t recognize that country. You can also use 2-letter country codes, like "!covid gb" for the United Kingdom.', group);
                }
            }
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });
    req.end();
}

function news(api, group, message) {
    var yesterday = new Date;
    yesterday.setDate(yesterday.getDate() - 1);

    if (message.split(' ').length == 1) {
        // Just !news so return a US headline
        newsapi.v2.topHeadlines({
            language: 'en',
            country: 'us'
        }).then(response => {
           if (response.status == 'ok') {
                let options = response.articles;
                let choice = options[randomNumberBetween(0, options.length-1)];
                let outcome = `BREAKING: ${choice.title}.\n\n${choice.description}`;
                api.sendMessage(outcome, group);
           }
        });
    }
    else {
        let splt = message.split(' ');
        splt.splice(0,1);
        let query = splt.join(' ');
        // Find a headline relevant to the query
        newsapi.v2.everything({
            q: query,
            language: 'en',
            from: yesterday
        }).then(response => {
           if (response.status == 'ok' && response.articles.length >= 1) {
                let options = response.articles;
                let choice = options[randomNumberBetween(0, options.length-1)];
                let outcome = `News pertaining to ${query} from ${choice.source.name}:\n\n${choice.title}.\n\n${choice.description}`;
                api.sendMessage(outcome, group);
           }
           else {
               api.sendMessage('Couldn\'t find anything in the last 24 hours about ' + query, group);
           }
        });
    }
}

function weather(api, group, message) {
    var query = message.split(' ');
    if (query.length == 1) {
        api.sendMessage('Specify a city or zip code, e.g. !weather new york or !weather 90210', group);
    }
    else if (!isNaN(query[1])) {
        query.splice(0, 1);
        query = query.join(' ');
        // Zip code
        let url = `https://api.openweathermap.org/data/2.5/weather?zip=${query}&units=imperial&appid=${WEATHER_API_KEY}`;
        https.get(url, function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                response = JSON.parse(body);
                // console.log(response)
                if (response.weather) {
                    let outcome = `Weather in ${response.name || '?'}: ${Math.round(response.main.temp) || '?'}˚ and ${response.weather[0].description || '?'}.\nLow: ${Math.round(response.main.temp_min) || '?'}˚ High: ${Math.round(response.main.temp_max) || '?'}˚`;
                    api.sendMessage(outcome, group);
                }
                else {
                    api.sendMessage('Could not find that zip. Make sure zip,countrycode are separated by commas.', group);
                }
            });
        });
    }
    else {
        query.splice(0, 1);
        query = query.join(' ');
        // City
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${WEATHER_API_KEY}`;
        https.get(url, function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                response = JSON.parse(body);
                // console.log(response)
                if (response.weather) {
                    let outcome = `Weather in ${response.name || '?'}: ${Math.round(response.main.temp) || '?'}˚ and ${response.weather[0].description || '?'}.\nLow: ${Math.round(response.main.temp_min) || '?'}˚ High: ${Math.round(response.main.temp_max) || '?'}˚`;
                    api.sendMessage(outcome, group);
                }
                else {
                    api.sendMessage('Could not find that location. Make sure city,state,countrycode are separated by commas.', group);
                }
            });
        });

    }
}

function alert(api, group, message) {
    let splt = message.split(' ');
    splt.splice(0, 1);
    let alert = splt.join(' ');
    api.getThreadInfo(group, (err, info) => {
        var tags = '';
        var mentions = [];
        let users = info.participantIDs;
        // don't tag self
        users.splice(users.indexOf(SELF_ID), 1);
        for (var u = 0; u < users.length; u++) {
            tags += `@${NAMEOF[users[u]]} `;
            mentions.push(
                {
                    tag: `@${NAMEOF[users[u]]}`,
                    id: users[u]
                });
        }
        api.sendMessage({
            body: `${tags}\n${alert}`,
            mentions: mentions,
        }, group);
    })
}

function recipes(api, group, message) {
    let auth = `&apiKey=${FOOD_API_KEY}`;
    if (message.split(' ').length == 1) {
        let url = 'https://api.spoonacular.com/recipes/random?number=1'+auth;
        https.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                response = JSON.parse(body);
                let recipe = response.recipes[0];
                let ings = [];
                for (var i = 0; i < recipe.extendedIngredients.length; i++) {
                    let ingredient = `${recipe.extendedIngredients[i].measures.us.amount} ${recipe.extendedIngredients[i].measures.us.unitLong} ${recipe.extendedIngredients[i].name}`
                    ings.push(ingredient);
                }
                ings = ings.join('\n');
                let outcome = `Hungry?\n\n${recipe.title}\n${ings}`;
                api.sendMessage(outcome, group);
            });
        });
    }
    else {
        let splt = message.split(' ');
        splt.splice(0, 1);
        let tags = splt.join(',');
        let url = 'https://api.spoonacular.com/recipes/random?number=1&tags='+tags+auth;
        https.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                response = JSON.parse(body);
                console.log(response);
                let recipe = response.recipes[0];
                if (recipe) {
                    let ings = [];
                    for (var i = 0; i < recipe.extendedIngredients.length; i++) {
                        let ingredient = `${recipe.extendedIngredients[i].measures.us.amount} ${recipe.extendedIngredients[i].measures.us.unitLong} ${recipe.extendedIngredients[i].name}`
                        ings.push(ingredient);
                    }
                    ings = ings.join('\n');
                    let outcome = `Hungry for ${splt.join(' & ')}?\n\n${recipe.title}\n${ings}`;
                    api.sendMessage(outcome, group);
                }
                else {
                    api.sendMessage(`Sorry, couldn't find anything with ${splt.join(', ')}`, group);
                }
            });
        });
    }
}

function wine(api, group, message, sender) {
    let auth = `&apiKey=${FOOD_API_KEY}`;
    if (message == '!wine cabernet') {message = '!wine cabernet sauvignon'}; // Allow for some shorthand

    if (message.split(' ').length == 1) {
        api.sendMessage('Please specify a type of wine, e.g. "!wine merlot"', group);
        return null;
    }

    let splt = message.split(' ');
    splt.splice(0, 1);
    let winetype = splt.join(' ');
    let url = 'https://api.spoonacular.com/food/wine/recommendation?number=2&wine='+winetype+auth;
    https.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            response = JSON.parse(body);
            let wines = response.recommendedWines;
            if(wines) {
                let wine1 = `${wines[0].title}\n${wines[0].description}\nRating: ${wines[0].averageRating.toFixed(2)}\nPrice: ${wines[0].price}`;
                let wine2 = `${wines[1].title}\n${wines[1].description}\nRating: ${wines[1].averageRating.toFixed(2)}\nPrice: ${wines[1].price}`;
                let outcome = `Your personal sommelier ${SELF_NAME} has a couple of suggestions for you, ${NAMEOF[sender]}:\n\n${wine1}\n\n${wine2}`;
                api.sendMessage(outcome, group);
            }
            else {
                api.sendMessage(`Sorry, couldn't find anything. Try something like "!wine pinot grigio"`, group);
            }
        });
    });

}

function trivia(api, group) {
    let url = 'https://opentdb.com/api.php?amount=1';
    https.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            response = JSON.parse(body);
            let question = he.decode(response.results[0].question);
            let answers = response.results[0].incorrect_answers;
            answers.push(response.results[0].correct_answer);
            // Shuffle the possible answers
            for (let i = answers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answers[i], answers[j]] = [answers[j], answers[i]];
            }
            // Decode html encoding
            for (let i = 0; i < answers.length; i++) {
                answers[i] = he.decode(answers[i]);
            }
            answers = answers.join('\n')
            api.sendMessage(question, group, function() {
                let give_possible_answers = setTimeout(function() {
                    api.sendMessage(`Got it yet? Here are some choices:\n${answers}`, group, function() {
                        let tell_correct_answer = setTimeout(function() {
                            api.sendMessage(`Time's up!\nThe answer is ${response.results[0].correct_answer}`, group);
                        }, 9000);
                    });
                }, 8000);
            });
        });
    });
}


module.exports = {
    help,
    introduceSelf,
    greet,
    respondToAF,
    tellAFToSTFU,
    flipACoin,
    rollDice,
    crystalBall,
    rps,
    letsDrink,
    randomName,
    cocktail,
    covid,
    news,
    weather,
    alert,
    recipes,
    wine,
    trivia
}