require("./../../util/function")();

module.exports = {
    config: {
        name: "poke",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: "Megbökhetsz vele valakit!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/poke/"];
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
                    .setDescription(`${message.author} megbökte ${cel}-t :flushed:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }
        });
    }
}