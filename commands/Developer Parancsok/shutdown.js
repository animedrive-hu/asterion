require("./../../util/function")();

module.exports = {
    config: {
        name: "restart",
        aliases: "",
        usage: "",
        category: "Developer Parancsok",
        description: "Restarts the bot.",
        accessableby: "Developer"
    },
    run: async (client, message, args) => {
        if (message.author.id == config.ownerid) {
            try {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${client.user.username} restart`, client.user.avatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                    }))
                    .setThumbnail(client.user.avatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                    }))
                    .setDescription(`${client.user.username} RESTARTING!`);
                await message.channel.send(embed);
                process.exit();
            } catch (e) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${client.user.username} restart`, client.user.avatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                    }))
                    .setThumbnail(client.user.avatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                    }))
                    .setDescription(`ERROR: ${e.message}`);
                message.channel.send(embed);
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`${client.user.username} restart`, client.user.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))
                .setThumbnail(client.user.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))
                .setDescription(`You are not a developer of ${client.user.username}!`);
            return message.channel.send(embed);
        }
    }
}