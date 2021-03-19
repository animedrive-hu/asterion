require("./../../util/function")();

module.exports = {
    config: {
        name: "teehee",
        aliases: "",
        usage: "@(személy)",
        category: "Interakciók",
        description: "Ha valami rosszat tettél amin nevetsz!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/teehee/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.author} valami rosszat csinált és nevet rajta! :stuck_out_tongue_closed_eyes:`)
                .setImage(response.body.url);
            return message.channel.send(embed);
        });
    }
}