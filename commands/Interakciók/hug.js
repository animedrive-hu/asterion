require("./../../util/function")();

module.exports = {
    config: {
        name: "hug",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: "Ha megölelnél valakit!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/hug/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {
            let cel = args[0];
            if (!cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} kér egy ölelést! :sob:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }

            if (cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} megöleli ${cel}-t :heart:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }
        });
    }
}