require("./../../util/function")();

module.exports = {
    config: {
        name: "cry",
        aliases: "",
        usage: "",
        category: "Interakciók",
        description: "ha épp sírnál!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/cry/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {

            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.author} sír! :sob: :sob:`)
                .setImage(response.body.url);
            return message.channel.send(embed);
        });
    }
}
