require("./../../util/function")();

module.exports = {
    config: {
        name: "kiss",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: "Puszit kérhetsz vagy adhatsz vele!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        superagent.get(`${rektapi}kiss`).end((err, response) => {
            let mention = message.mentions.users.first();
            if (!mention) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} kér egy puszit/csókot :flushed:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            } else if (mention.id != config.lovedid) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} ad egy puszit/csókot ${mention}-nak/nek :kissing_heart:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            } else if (mention.id == config.lovedid) {
                if (message.author.id == config.ownerid) {
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`${message.author} ad egy puszit/csókot ${mention}-nak/nek :kissing_heart: :kissing_heart:`)
                        .setImage(response.body.url);
                    return message.channel.send(embed);
                } else if (message.author.id != config.ownerid) {
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`${message.author} Őt nem tudod megpuszilni/csókolni :stuck_out_tongue:`)
                    return message.channel.send(embed);
                }
            }
        });
    }
}