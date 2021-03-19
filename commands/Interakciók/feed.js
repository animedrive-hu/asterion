require("./../../util/function")();

module.exports = {
    config: {
        name: "feed",
        aliases: "",
        usage: "<@felhasználó>",
        category: "Interakciók",
        description: "Ha meg szeretnél valakit etetni",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        let mention = message.mentions.users.first();
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} Interaciók`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`Jelölj meg valakit!`);
        if (!mention) return message.channel.send(embed)
        const links = ["http://rektapi.blackfire.hu/feed/"];
        const random = links[Math.floor(Math.random() * links.length)];
        superagent.get(random).end((err, response) => {

            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.author} megeteti ${mention}-t! :smile: :smile:`)
                .setImage(response.body.url);
            return message.channel.send(embed);
        });
    }
}
