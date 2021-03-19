require("./../../util/function")();

module.exports = {
    config: {
        name: "rape",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: ";)",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/rape/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {
            let cel = args[0];
            if (!cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} Tag-elj be egy személyt :rolling_eyes:`)
                return message.channel.send(embed);
            }

            if (cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} **Hello rendőrség?** :thinking:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }
        });
    }
}