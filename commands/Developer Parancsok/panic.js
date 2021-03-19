require("./../../util/function")();

module.exports = {
    config: {
        name: "panic",
        aliases: "",
        usage: "@(személy)",
        category: "Developer Parancsok",
        description: "Pánik parancs! Vészhelyzet esetére!",
        accessableby: "Fejlesző"
    },
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`Ezt a parancsot csak fejlesztők használhatják.`)
        if (message.author.id != config.ownerid) return message.channel.send(embed);

        var con;

        con = mysql.createConnection({
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database
        });
        con.query('SELECT * FROM serversettings where SID = ?', message.guild.id, function (err, rows) {
            if (err) throw err;
            let arg = args[0];
            let current = rows[0].panic;
            if (!arg) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setDescription(`Pánik beállítás: **${current}**`)
                return message.channel.send(embed);
            } else if (current == arg) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setDescription(`Ennél jobban nem lehet **${arg}** a pánik mód!`)
                return message.channel.send(embed);
            } else {
                try {
                    con.query(`UPDATE serversettings SET panic = '${arg}' WHERE SID = '${message.guild.id}'`);
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setDescription(`Pánik mód beállítva erre: **${arg}**`)
                    message.channel.send(embed);
                } catch (e) {
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setDescription(`Pánik mód beállítás hiba: \n ${e}`)
                    message.channel.send(embed);
                }
            }
        });
    }
}