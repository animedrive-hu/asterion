require("./../../util/function")();

module.exports = {
    config: {
        name: "clear",
        aliases: "",
        usage: "(szám)",
        category: "Mod Parancsok",
        description: "Több üzenet egyideű törlése!",
        accessableby: "Moderátor+"
    },
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} clear`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`Nincs megfelelő jogod a parancs használatához!`);
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(embed)

        const number = parseInt(args[0]);

        if (!number) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${client.user.username} clear`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setDescription(`Nem adtál meg számot!`);
                return message.channel.send(embed)
        } else {
            try {
                message.channel.bulkDelete(number + 1);
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${client.user.username} clear`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setDescription(`${number} DB üzenet törölve!`);
                return message.channel.send(embed)
            } catch (error) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${client.user.username} clear`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setDescription(`HIBA:\n${error}`);
                return message.channel.send(embed)
            }
        }
    }
}
