require("../../util/function")();

module.exports = {
    config: {
        name: "nekomeme",
        aliases: "",
        usage: "",
        category: "MEME",
        description: "Sensei küld egy meme-t rektapi rol!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const links = ["http://rektapi.blackfire.hu/meme"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {

            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(response.body.url);
            return message.channel.send(embed);
        });

    }
}