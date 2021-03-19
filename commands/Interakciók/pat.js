require("./../../util/function")();

module.exports = {
    config: {
        name: "pat",
        aliases: ["pet"],
        usage: "@(személy)",
        category: "Interakciók",
        description: "simi-simi",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/pat/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {
            let cel = args[0];
            if (!cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} kér egy simit! :sob:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }

            if (cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} megsimogatja ${cel}-t :heart:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }
        });
    }
}