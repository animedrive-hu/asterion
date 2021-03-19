require("./util/function")();

const client = new Discord.Client();

["aliases", "commands"].forEach(x => client[x] = new Discord.Collection());
["commands", "eventHandler"].forEach(x => require(`./util/${x}`)(client));

client.login(config.token);