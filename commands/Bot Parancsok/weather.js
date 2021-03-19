require("./../../util/function")();

module.exports = {
    config: {
        name: "weather",
        aliases: "",
        usage: "település",
        category: "Bot Parancsok",
        description: `Időjárás az adott településen!`,
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        weather.find({ search: args.join(" "), degreeType: "C" }, function (
            err,
            result
        ) {
            if (err) message.channel.send(err);
            if (result.length === 0) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${client.user.username} weather`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setDescription(`**Írj be egy létező várost.**`);
                return message.channel.send(embed);
            }

            var current = result[0].current;
            var location = result[0].location;

            const embed = new Discord.MessageEmbed()
                .setTitle(`Időjárás itt: ${current.observationpoint}`)
                .setAuthor(`${client.user.username} weather`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setColor(0x00ae86)
                .setDescription(`**${current.skytext}**`)
                .setThumbnail(current.imageUrl)
                .setFooter(`© Animem.org`, message.author.avatarURL)
                .addField("időzóna", `${location.timezone}`, true)
                .addField("Hőmérséklet", `${current.temperature} c°`, true)
                .addField("szél", current.winddisplay, true)
                .addField("páratartalom", `${current.humidity}%`, true)
                .setTimestamp();
            message.channel.send({ embed });
        });

    }
}