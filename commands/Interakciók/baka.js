require("./../../util/function")();

module.exports = {
    config: {
        name: "baka",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: "Ha lehülyéznél valakit vagy esetleg magad!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/baka/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {
            let cel = args[0];
            if (!cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} hülye :triumph:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }

            if (cel) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${message.author} szerint ${cel} hülye :triumph:`)
                    .setImage(response.body.url);
                return message.channel.send(embed);
            }
        });
    }
}