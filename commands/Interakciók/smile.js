require("./../../util/function")();

module.exports = {
    config: {
        name: "smile",
        aliases: ["happy"],
        usage: "@(személy)",
        category: "Interakciók",
        description: "Ha mosolyogsz!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/smile/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.author} mosolyog! :smile:`)
                .setImage(response.body.url);
            return message.channel.send(embed);
        });
    }
}