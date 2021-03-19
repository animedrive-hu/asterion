require("./../../util/function")();

module.exports = {
    config: {
        name: "mad",
        aliases: "",
        usage: "",
        category: "Interakciók",
        description: "ha ideges vagy!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/mad/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {

            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.author} ideges! :rage:`)
                .setImage(response.body.url);
            return message.channel.send(embed);
        });
    }
}
