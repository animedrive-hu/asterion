require("./../../util/function")();

module.exports = {
    config: {
        name: "cuddle",
        aliases: ["coodle"],
        usage: "@(személy)",
        category: "Interakciók",
        description: "Ha valakihez odaszeretnél bújni!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/cuddle/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {
            let mention = message.mentions.users.first();
            if (!mention) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} szeretné ha valaki hozzábújna! :sob:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} hozzábújik ${mention}-hoz/hez :heart:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }
        });
    }
}