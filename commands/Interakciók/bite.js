require("./../../util/function")();

module.exports = {
    config: {
        name: "bite",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: "Ha szeretnéd hogy megharapjanak vagy meg akarsz valakit harapni!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        superagent.get(`${rektapi}bite`).end((err, response) => {
            let cel = args[0];
            if (!cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} szeretné ha megharapnák! :scream:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }

            if (cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} szeretné ha megharapnák! :scream:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }
        });
    }
}