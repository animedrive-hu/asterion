require("./../../util/function")();

module.exports = {
    config: {
        name: "dodge",
        aliases: "",
        usage: "",
        category: "Interakciók",
        description: "Ha elkerülnél valamit!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/dodge/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.author} kikerülte! <:man_gesturing_no:694058477202571274>`)
                .setImage(response.body.url);
            return message.channel.send(embed);
        });
    }
}