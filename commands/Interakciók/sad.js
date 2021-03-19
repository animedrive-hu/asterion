require("./../../util/function")();

module.exports = {
    config: {
        name: "sad",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: "Ha szomorú",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/sad/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {

            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.author} szomorú! :disappointed: :no_mouth:`)
                .setImage(response.body.url);
            return message.channel.send(embed);
        });
    }
}