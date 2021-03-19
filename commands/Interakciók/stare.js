require("./../../util/function")();

module.exports = {
    config: {
        name: "stare",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: "Ha bámulsz valakit és kimutatnád!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/stare/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {
            let cel = args[0];
            if (!cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} bámul! :upside_down:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }

            if (cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} bámulja ${cel}-t :upside_down:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }
        });
    }
}