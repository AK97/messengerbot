# messengerbot
This is a facebook messenger bot that acts as a sort of virtual assistant.  
As it stands it's NSFW, but can easily be stripped of its swearing and drug references.  
It can also do some funny things like yell at a designated annoying friend every now and then.  
It uses a variety of web APIs to deliver some handy information upon request.  
This project was inspired by a more meme-centric bot written by @tarungog et al.  
This repo attempts to be an adaptation with cleaner code and easy customizability.  
It's a little hard to imagine "legitimate" use cases for such a bot but who knows. An AI robot will probably be a staple of every group chat in the future 🤖.  

### Requirements
- A facebook account [**Necessary**]
- OpenWeatherMap api key [**Optional**]
- News API api key [**Optional**]

### Installation & Usage
- Download/clone repo
- Make a file 'login.json' in /assets that looks like this:  
```javascript
{
    "email": "",
    "password": "",
    "news_api_key": "",
    "weather_api_key": "",
    "account_id": "",
    "name": ""
}
```
with the relevant fields filled out. name can be anything of your choosing e.g. friendbot
- Optionally, make a file 'users.json' in /assets that looks like this:
```javascript
{
    "1234": "Alice",
    "5678": "Bob",
    "9012": "Carol",
}
```
where keys are fb profile IDs and names are names/nicknames. Include any user you wish to ever address by name.
- ```npm install```
- ```npm start```
- Begin chatting the bot's account or add it to any group chat.