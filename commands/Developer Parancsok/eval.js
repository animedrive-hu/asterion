require("./../../util/function")();

module.exports = {
    config: {
        name: "eval",
        aliases: "",
        usage: "",
        category: "Developer Parancsok",
        description: "Js kódot futtat le.",
        accessableby: "Fejlesző"
    },
    run: async (client, message, args) => {
        if (message.author.id == config.ownerid) {
            try {
                let toEval = args.join(" ")
                let evaluated = util.inspect(eval(toEval, { depth: 0 }));

                if (!toEval) {
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(`${client.user.username} eval`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setDescription(`Nem tudom lefuttatni a: \`LEVEGŐT!\``);
                    return message.channel.send(embed)
                } else {
                    let hrStart = process.hrtime()
                    let hrDiff;
                    hrDiff = process.hrtime(hrStart);
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(`${client.user.username} eval`, client.user.iconURL)
                        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setDescription(`*Lefutott: ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms alatt!*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });
                    return message.channel.send(embed)
                }

            } catch (e) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${client.user.username} eval`, client.user.iconURL)
                    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setDescription(`Hiba: \`${e.message}\``);
                return message.channel.send(embed)
            }

        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`${client.user.username} eval`, client.user.iconURL({ format: 'png', dynamic: true, size: 2048 }))
                .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setDescription(`Nem vagy ${client.user.username} fejlesztője!`);
            return message.channel.send(embed)
        }
    }
}