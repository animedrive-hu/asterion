require("./../../util/function")();

module.exports = {
    config: {
        name: "reload",
        aliases: "",
        usage: "<parancs neve>",
        category: "Developer Parancsok",
        description: "parancs újratöltés!",
        accessableby: "Fejelsztő"
    },
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} reload`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`nincs jogod a parancs használatához!!`)
        if (message.author.id !== config.ownerid) return message.channel.send(embed).then(message => message.delete(5000));

        const embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} reload`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`Adj meg egy parancsot!`)
        if (!args[0]) return message.channel.send(embed1);
        const commandName = args[0].toLowerCase();
        const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
        fs.readdirSync(path.join(__dirname, "..")).forEach(f => {
            const files = fs.readdirSync(path.join(__dirname, "..", f));
            if (files.includes(`${commandName}.js`)) {
                const file = `../${f}/${commandName}.js`;
                try {
                    delete require.cache[require.resolve(file)];
                    client.commands.delete(commandName);
                    const pull = require(file);
                    client.commands.set(commandName, pull);
                    const embed2 = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(`${client.user.username} reload`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setDescription(`A parancs újratöltve: **${commandName.toUpperCase()}**!`)
                    return message.channel.send(embed2);
                }
                catch (err) {
                    const embed3 = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(`${client.user.username} reload`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setDescription(`Nem tudtam újratölteni a/az ${args[0].toUpperCase()} parancsot!`)
                    message.channel.send(embed3);
                    return console.log(err.stack || err);
                }
            }
        });
    }
}