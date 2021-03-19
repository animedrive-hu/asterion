require("./../../util/function")();

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "",
        category: "Bot Parancsok",
        description: "Kiírja az összes parancsot.",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} Help`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))

        if (!args[0]) {
            const categories = fs.readdirSync("./commands/")

            embed.setDescription(`Elérhető parancsok ${client.user.username}-hez\nA prefix: **${config.prefix}**`)
            embed.setFooter(`© ${client.user.username} | Összes parancs: ${client.commands.size}`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }));

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(", "))
                } catch (e) {
                    console.log(e)
                }
            })

            return message.channel.send(embed)
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!command) return message.channel.send(embed.setTitle("Hibás parancs.").setDescription(`\`${config.prefix}help\` A parancsok megtekíntéséhez..`))
            command = command.config

            embed.setDescription(commontags.stripIndents`A prefix: \`${config.prefix}\`\n
            **Parancs:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Leírás:** ${command.description || "Nem található leírás!"}
            **Használat:** ${command.usage ? `\`${config.prefix}${command.name} ${command.usage}\`` : "Nincs megadva!"}
            **Használhatja:** ${command.accessableby || "Tag+"}
            **Alternatív parancsok:** ${command.aliases ? `${command.aliases.join(", ")}` : "Egy sincs."}`)

            return message.channel.send(embed)
        }
    }
}