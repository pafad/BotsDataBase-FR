const Discord = require("discord.js");
const client = new Discord.Client();
let type = 1;
var config = require("./config");
var prefix = config.prefix;
//client est prêt
client.on("ready", () => {
console.log('___\nAllumage ou Reboot réussi !\n___\nC\'est allumé ! Le Bots-list va continuer')
client.user.setPresence({game: { name: "#bots-list || BotsB FR", url:"https://www.twitch.tv/pafad0gaming",type}})
});
//join
client.on("guildMemberAdd", member => {
    client.channels.get("414429834689773580").send(`Bienvenue sur le serveur ${member} amuses toi bien !`)
})
//leave
client.on("guildMemberRemove", member =>{
    client.channels.get("414429834689773580").send(`${member.displayName} a quitté le serveur !`)
})
//début des commandes
client.on('message', message => {
    if(message.author.bot)return;
    if(message.channel.type === "dm") return message.channel.send(" hm ?");
    if(!message.content.startsWith(prefix))return;
  // This is the best way to define args. Trust me.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commandes/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err){
  return;
  }
  //blacklist:
    if(message.author.id === "317221808405348364")return;
});
client.login(process.env.token);
