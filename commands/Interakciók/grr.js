require("./../../util/function")();

module.exports = {
    config: {
        name: "grr",
        aliases: "",
        usage: "",
        category: "Interakciók",
        description: "GRRR!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/grr"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.author}: GRR!!`)
                .setImage(response.body.url);
            return message.channel.send(embed);
        }
        );
    }
}
