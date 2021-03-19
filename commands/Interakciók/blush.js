require("./../../util/function")();

module.exports = {
    config: {
        name: "blush",
        aliases: "",
        usage: "",
        category: "Interakciók",
        description: "Ha elpirulnál!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/blush/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {

            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.author} Elpirul! :blush: :flushed:`)
                .setImage(response.body.url);
            return message.channel.send(embed);
        });
    }
}