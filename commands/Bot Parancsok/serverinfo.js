require("./../../util/function")();

module.exports = {
    config: {
        name: "serverinfo",
        aliases: "",
        usage: "",
        category: "Bot Parancsok",
        description: `Információk a szerver röl!`,
        accessableby: "Tag+"
    },
    run: async (client, message) => {
		const categoryChannels = message.guild.channels.cache.filter(channel => channel.type === "category");
		const channel_count = message.guild.channels.cache.size - categoryChannels.size;
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} info`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setTimestamp()
            .addField("Felhasználók", message.guild.memberCount)
            .addField("Csatornák száma", channel_count)
            .addField("Létrehozva", (message.guild.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''))
            .setFooter(`© ${client.user.username} | info parancs`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }));

        return message.channel.send(embed);

    }
}