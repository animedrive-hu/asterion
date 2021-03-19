require("./../../util/function")();

module.exports = {
    config: {
        name: "bad",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: "Ha valaki rosszat csinált vagy megütheted akár magad is!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        superagent.get(`${ rektapi }bad`).end((err, response) => {
            let cel = args[0];
            if (!cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} megüti magát mert rosszat csinált!`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }

            if (cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} megüti ${cel}-t mert rosszat csinált!`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }
        });
    }
}
