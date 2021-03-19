require("./../../util/function")();

module.exports = {
    config: {
        name: "slap",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: "Fel Pofozhatsz vele valakit vagy magad!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/slap/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {
            let cel = args[0];
            if (!cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} felpofozza saját magát : scream:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }

            if (cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} felpofozza ${cel}-t :open_mouth:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }
        });
    }
}