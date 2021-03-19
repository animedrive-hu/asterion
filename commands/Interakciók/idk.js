require("./../../util/function")();

module.exports = {
    config: {
        name: "idk",
        aliases: "",
        usage: "",
        category: "Interakciók",
        description: "Kizárt dolog mert nem tudom!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/idk/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {

            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.author} nem tudja! :man_shrugging:`)
                .setImage(response.body.url);
            return message.channel.send(embed);
        });
    }
}
