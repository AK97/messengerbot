# messengerbot
This is a facebook messenger bot that acts as a sort of virtual assistant.  
As it stands it's NSFW, but can easily be stripped of its swearing and drug references.  
It can also do some funny things like yell at a designated annoying friend every now and then.  
It uses a variety of web APIs to deliver some handy information upon request.  
This project was inspired by a more meme-centric bot written by [@tarungog](https://github.com/tarungog) et al.  
This repo attempts to be an adaptation with cleaner code and easy customizability.  
It's a little hard to imagine "legitimate" use cases for such a bot but who knows. An AI robot will probably be a staple of every group chat in the future 🤖.  

### Requirements
- A facebook account [**Necessary**]
- OpenWeatherMap api key [**Optional**]
- News API api key [**Optional**]
- Spoonacular api key [**Optional**]
- Google custom search engine id & api key [**Optional**]

### Installation
- Download/clone repo
- Make a file ```assets/login.json``` that looks like this:  
```javascript
{
    "email": "",
    "password": "",
    "news_api_key": "",
    "weather_api_key": "",
    "food_api_key": "",
    "search_api_key": "",
    "search_id": "",
    "account_id": "",
    "name": "",
    "greeting": ""
}
```
with the relevant fields filled out. Value for "name" can be anything of your choosing e.g. friendbot
- Optionally, make a file ```assets/users.json``` that looks like this:
```javascript
{
    "1234": "Alice",
    "5678": "Bob",
    "9012": "Carol",
}
```
where keys are fb numeric profile IDs and values are names/nicknames. Include any user you wish to ever address by name.
- ```npm install```
- ```npm start```  

### Usage
You can chat with the bot individually or add it to any group chat.  
Start by saying "!help" for a list of commands.  
![Sample bot help menu](https://raw.githubusercontent.com/AK97/messengerbot/master/assets/sample_help_menu.png)
