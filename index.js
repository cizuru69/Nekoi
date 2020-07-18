require('dotenv').config();
const {Client, Attachment} = require('discord.js');
const cheerio = require('cheerio');
const request = require('request');
const Discord = require('discord.js');
const alive = require('./keep_alive.js');
var version = '0.1';
const prefix = "$";

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

bot.on('ready', () => {
  console.log('Ok Cok Aku Alive');
 bot.user.setActivity('With Domath');
});

const fs = require('fs');

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./command/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./command/${file}`);

    bot.commands.set(command.name, command);
}
bot.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        bot.commands.get('ping').execute(message, args);
    } 
    if(command === 'link'){
  
    	bot.commands.get('link').execute(message, args);
    }
    if(command === 'info'){
   bot.commands.get('info').execute(message, args)};
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome'); 
  if (!channel) return;
  channel.send(`Selamat Datang ${member}!`);
  set(color('#FFFF000'));
});
bot.on('message', message => {

    let args = message.content.substring(prefix.length).split(" ");

    switch (args[0]) {
        case 'meme':
        meme(message);

        break;
    }

});

function meme(message){

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "meme lucu banget",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
        $ = cheerio.load(responseBody); 

        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       

        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
 

}
})


bot.on('message', message => {
  if (message.channel.type != 'text' || message.author.bot)
    return;

  let command = message.content.split(' ')[0].slice(1);
  let args = message.content.replace('.' + command, '').trim();

  switch (command) {
    case 'cek': {
      message.channel.send('Pong! (~ ' + bot.ping + 'ms)');
      break;
    }


    case 'uptime': {
    	let days = Math.floor(bot.uptime / 86400000);
      let hours = Math.floor(bot.uptime / 3600000) % 24;
      let minutes = Math.floor(bot.uptime / 60000) % 60;
      let seconds = Math.floor(bot.uptime / 1000) % 60;

      message.channel.send(`**__Waktu Aktif:__**\n${days}d ${hours}h ${minutes}m ${seconds}s`);
      break;
    }
  }
});