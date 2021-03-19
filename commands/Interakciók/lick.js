require("./../../util/function")();

module.exports = {
    config: {
        name: "lick",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: "Ha megnyalnál valakit!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/lick/"];
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
                    .setDescription(`${message.author} megnyalta ${cel}-t :flushed:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }
        });
    }
}