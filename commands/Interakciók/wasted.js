require("./../../util/function")();

module.exports = {
    config: {
        name: "wasted",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: "Ha valami el lett cseszve!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/wasted/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {
            let cel = args[0];
            if (!cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} elcseszte :face_palm:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }

            if (cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} szerint ${cel} elcseszte :face_palm:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }
        });
    }
}